export type Song = {
   image_file_path: string;
   song_url: string;
   singer: string;
   size: number;
   song_file_path: string;
   name: string;
   duration: number;
   id: number;
   image_url: string;
};

export type Lyric = {
   start: number;
   end: number;
   text: string;
};

export type SongLyric = {
   id: number | null;
   song_id: number;
   base_lyric: string;
   lyrics: string;
};

export type SongWithLyric = Song & {
   song_lyric: SongLyric | null;
};