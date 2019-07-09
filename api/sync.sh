
scp -r /Users/yimutian/Lvsi/Private-work/tiktok/api/app root@154.8.226.77:/home/wwwroot/tiktok.tiantianquan.com/api/

scp -r /Users/yimutian/Lvsi/Private-work/tiktok/api/routes root@154.8.226.77:/home/wwwroot/tiktok.tiantianquan.com/api/

scp -r /Users/yimutian/Lvsi/Private-work/tiktok/api/database root@154.8.226.77:/home/wwwroot/tiktok.tiantianquan.com/api/

scp -r /Users/yimutian/Lvsi/Private-work/tiktok/api/storage root@154.8.226.77:/home/wwwroot/tiktok.tiantianquan.com/api/

cd ~/Lvsi/Private-work/tiktok/api;git pull origin;git add .;git commit -m "修改";git push origin;