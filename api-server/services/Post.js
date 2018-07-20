const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const CommentService = reqlib('/services/Comment')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const { moveImage } = reqlib('/utils/image')
const BoxType = reqlib('/../shared/constants/BoxType')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Post {
  // 投稿画像を一括して移動
  static async moveImages(files) {
    if (Array.isArray(files)) {
      const promises = files.map(async file => {
        const { path, filename } = file
        const dbPath = `${Path.POST_IMG_DIR}/${filename}`
        const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
        await moveImage(path, fullPath)
        return dbPath
      })
      return Promise.all(promises)
    } else {
      return []
    }
  }

  static async save(
    postId,
    userId,
    brandId,
    boxType,
    released,
    title,
    body,
    categoryIndex,
    files,
    fromServerFiles,
    transaction
  ) {
    try {
      let data = {
        brandId,
        boxType,
        released,
        posterId: userId,
        title,
        body
      }
      // optional params
      if (categoryIndex) {
        data = { ...data, categoryIndex }
      }
      // save images if needed (union)
      const newImages = await Post.moveImages(files)
      data = { ...data, images: _.union(fromServerFiles, newImages) }

      if (postId) {
        await models.Post.update(
          data,
          { where: { id: postId } },
          { transaction }
        )
      } else {
        const post = await models.Post.create(data, { transaction })
        // 再代入なので微妙？
        postId = post.id
      }
      return postId
    } catch (e) {
      console.error(e)
    }
  }

  static async saveVoice(postId, options, deadline, trans) {
    try {
      const created = await models.Voice.upsert(
        {
          postId,
          options,
          deadline
        },
        {
          transaction: trans
        }
      )
      return created
    } catch (e) {
      console.error(e)
    }
  }

  static async fetchList(pageNum, where, options = {}) {
    // optionsを展開
    let { perPage, userId, assoc } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    // 特定条件なら関連テーブルも引っ張る
    let include = []
    if (assoc || (where && where.boxType === BoxType.index.voice)) {
      include.push({
        model: models.Voice,
        attributes: ['options', 'deadline', 'count']
      })
    }
    if (assoc && userId) {
      // 自分がそのPostにLike済みか PostLike: [] or [{ upOrDown: true or false }]
      include.push({
        model: models.PostLike,
        attributes: ['upOrDown'],
        where: { userId },
        required: false
      })
    }

    try {
      const posts = await models.Post.findAll({
        where: where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        include
      })
      const plainPosts = posts.map(e => e.get({ plain: true }))
      return await Post.associateWithUser(plainPosts)
    } catch (e) {
      console.error(e)
    }
  }

  // 投票（UPDATE対応済）
  static async saveVote(postId, voterId, choiceIndex, comment) {
    // 初投票ならtrue, 更新ならfalse
    let isFirstVote = false
    const transaction = await models.sequelize.transaction()
    try {
      const log = await models.VoiceLog.findOne({
        where: { postId, voterId }
      })
      if (log) {
        // 投票済みなのでカウントは増やさない
        await log.update({ choiceIndex })
      } else {
        // INSERT and count up sum table
        isFirstVote = true

        // insert comment if exist, nested transaction
        // NOTE: ネストしたトランザクションになるけど大丈夫か？
        let commentId = 0
        if (comment) {
          const created = await CommentService.save(postId, voterId, comment)
          commentId = created.id
        }

        // insert log
        await models.VoiceLog.create(
          {
            postId,
            voterId,
            choiceIndex,
            commentId
          },
          { transaction }
        )

        // count up vote count
        await models.Voice.update(
          { count: models.sequelize.literal('count + 1') },
          { where: { postId } },
          { transaction }
        )
      }

      await transaction.commit()
      return isFirstVote
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return false
    }
  }

  // Like（UPDATE対応済）
  static async saveLike(postId, userId, upOrDown) {
    const transaction = await models.sequelize.transaction()
    try {
      await models.PostLike.upsert(
        {
          postId,
          userId,
          upOrDown
        },
        { transaction }
      )

      // increment if up
      let query = upOrDown ? '`like` + 1' : '`like` - 1'
      await models.Post.update(
        { like: models.sequelize.literal(query) },
        { where: { id: postId } },
        { transaction }
      )

      await transaction.commit()
      return true
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return false
    }
  }

  // 特定のユーザの投票結果（choiceIndex）を取得
  static async fetchVote(postId, voterId) {
    try {
      const row = await models.VoiceLog.findOne({
        attributes: ['choiceIndex'],
        where: { postId, voterId },
        raw: true
      })

      if (!row) return null

      console.log(
        `choiceIndex of post:${postId}, voter:${voterId}, i:${row.choiceIndex}`
      )
      return row.choiceIndex
    } catch (e) {
      console.error(e)
    }
  }

  // NOTE: mutate original posts
  // postIdsをもとに表示するのに必要なユーザ情報を追加
  static async associateWithUser(posts) {
    const names = await UserService.fetchAllObj(_.map(posts, 'posterId'))
    const merged = posts.map(p => {
      const { name, iconPath } = names[p.posterId]
      return { ...p, name, iconPath }
    })
    return merged
  }
}
