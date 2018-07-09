const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

const PER_PAGE = 20

module.exports = class Post {
  // 投稿画像を一括して移動
  static async moveProfileIcon(files) {
    if (Array.isArray(files)) {
      const promises = files.map(async file => {
        const { path, filename } = file
        const dbPath = `${Path.POST_IMG_DIR}/${filename}`
        const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
        await moveFile(path, fullPath)
        return dbPath
      })
      return Promise.all(promises)
    } else {
      return []
    }
  }

  static async save(
    userId,
    brandId,
    boxType,
    released,
    title,
    body,
    categoryIndex,
    files,
    fromServerFiles,
    trans
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
      const newImages = await Post.moveProfileIcon(files)
      data = { ...data, images: _.union(fromServerFiles, newImages) }

      const post = await models.Post.create(data, {
        transaction: trans
      })

      return post
    } catch (e) {
      console.error(e)
    }
  }

  static async saveVoice(postId, options, deadline, trans) {
    try {
      const voice = await models.Voice.create(
        {
          postId,
          options,
          deadline
        },
        {
          transaction: trans
        }
      )
      return voice
    } catch (e) {
      console.error(e)
    }
  }

  static async fetchList(pageNum, where) {
    try {
      const posts = await models.Post.findAll({
        where: where,
        limit: PER_PAGE,
        offset: PER_PAGE * (pageNum - 1),
        order: [['id', 'DESC']]
        // raw: true,
        // include: [
        //   {
        //     model: models.Voice,
        //     attributes: ['options', 'deadline']
        //     // as: 'voice'
        //   }
        // ]
      })
      const plainPosts = posts.map(e => e.get({ plain: true }))
      return await Post.associateWithUser(plainPosts)
    } catch (e) {
      console.error(e)
    }
  }

  // 投票（UPDATE対応済）
  static async saveVote(postId, voterId, choiceIndex) {
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
        await models.VoiceLog.create(
          {
            postId,
            voterId,
            choiceIndex
          },
          { transaction }
        )
        await models.Voice.update(
          { count: models.sequelize.literal('count + 1') },
          { where: { postId } },
          { transaction }
        )
      }

      transaction.commit()
      return isFirstVote
    } catch (e) {
      transaction.rollback()
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
