#!/bin/sh
cd `dirname $0`

# バックアップの保存期間（days）
period=7

# バックアップ保存用ディレクトリの指定
dirpath='/home/commune/backup'

# ファイル名を指定する(※ファイル名で日付がわかるようにしておきます)
filename=`date +%y%m%d`

# 指定したDBのスキーマおよびデータをすべて吐き出す
docker exec node-commune_db_1 mysqldump -uroot commune | gzip > $dirpath/$filename.sql.gz

# パーミッション変更
chmod 700 $dirpath/$filename.sql.gz

# 保存期間を過ぎたバックアップを削除
oldfile=`date --date "$period days ago" +%y%m%d`
rm -f $dirpath/$oldfile.sql.gz
