# trick for gifs:

gifsicle --unoptimize --explode original.gif &&
find . -iname "*\.gif\.*" | sort > frame_list.txt &&
find . -iname "*\.gif\.*" | sort -r >> frame_list.txt &&
cat frame_list.txt | xargs gifsicle > reversed.gif