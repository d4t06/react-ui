import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "./PlayerContext";
import { Song } from "./types";

const data: Song[] = [
   {
      id: 129,
      name: "Creep (Extended)",
      singer: "GAMPER & DADONI",
      image_url: "",
      image_file_path: "",
      song_url:
         "https://firebasestorage.googleapis.com/v0/b/zingmp3-clone-61799.appspot.com/o/test%2Fhuudat01234560-creepextended-gamperdadoni-8177347-mp3cut-net--mp3_1725592600268?alt=media",
      song_file_path:
         "test/huudat01234560-creepextended-gamperdadoni-8177347-mp3cut-net--mp3_1725592600268",
      duration: 171,
      size: 2911,
   },
   {
      id: 156,
      name: "Dusk Till Dawn",
      singer: "Zayn, Sia",
      image_url: "",
      image_file_path: "",
      song_url:
         "https://firebasestorage.googleapis.com/v0/b/zingmp3-clone-61799.appspot.com/o/test%2Fdusktilldawn-zaynsia-5164057-mp3_1725625682859?alt=media&token=0c623f88-f4d2-4831-817d-ce791281ff91",
      song_file_path: "test/dusktilldawn-zaynsia-5164057-mp3_1725625682859",
      duration: 239,
      size: 3750,
   },
   {
      id: 157,
      name: "End Of Time",
      singer: "Ahrix, Alan Walker, K-391",
      image_url: "",
      image_file_path: "",
      song_url:
         "https://firebasestorage.googleapis.com/v0/b/zingmp3-clone-61799.appspot.com/o/test%2Fburywf6scq-mp3_1725644707067?alt=media&token=4ba74689-8b2f-4219-a170-b07ed57cb182",
      song_file_path: "test/burywf6scq-mp3_1725644707067",
      duration: 187,
      size: 3169,
   },
   {
      id: 154,
      name: "Firestone",
      singer: "Kygo & Conrad Sewell",
      image_url: "",
      image_file_path: "",
      song_url:
         "https://firebasestorage.googleapis.com/v0/b/zingmp3-clone-61799.appspot.com/o/test%2Ffirestone-kygoconradsewell-9644875-mp3_1725622602942?alt=media&token=e6b8986d-c321-4cf0-a9d1-42ed8e29b34c",
      song_file_path:
         "test/firestone-kygoconradsewell-9644875-mp3_1725622602942",
      duration: 271,
      size: 4486,
   },
   {
      id: 161,
      name: "Gizmo",
      singer: "Syn Cole",
      image_url: "",
      image_file_path: "",
      song_url:
         "https://firebasestorage.googleapis.com/v0/b/zingmp3-clone-61799.appspot.com/o/test%2Fgizmo-syncole-6046197-mp3_1726232419092?alt=media&token=fd0c1980-3c8e-4576-bbc7-c141d86f3d09",
      song_file_path: "test/gizmo-syncole-6046197-mp3_1726232419092",
      duration: 191,
      size: 3008,
   },
];

export default function useGetSongs() {
   const [isFetching, setIsFetching] = useState(true);

   const ranEffect = useRef(false);

   const { setSongs } = usePlayerContext();

   const api = async () => {
      try {
         await new Promise<void>((rs) => {
            setTimeout(rs, 1000);
         });

         // const res = await fetch("https://nest-mp3.vercel.app/api/songs");

         // if (res.ok) {
         //    const payload = (await res.json()) as { data: { songs: Song[] } };
         //    setSongs(payload.data.songs);
         // }

         setSongs(data);
      } catch (error) {
         console.log({ message: error });
      } finally {
         setIsFetching(false);
      }
   };

   useEffect(() => {
      if (!ranEffect.current) {
         ranEffect.current = true;
         api();
      }
   }, []);

   return {
      isFetching,
   };
}
