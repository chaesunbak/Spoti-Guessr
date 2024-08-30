import { useState, useEffect } from "react"
import { collection, getDocs, doc, updateDoc, increment, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase"
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import {ko} from "date-fns/locale";

export default function CommentList() {
    const params = useParams();
    const gamemode = params.gamemode;
    const id = params.id;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const querySnapshot = await getDocs(collection(db, gamemode, id, "comments"));
            const commentsData = [];
            querySnapshot.forEach((doc) => {
                commentsData.push({ id: doc.id, ...doc.data() });
            });
            setComments(commentsData);
        };

        fetchComments();
    }, [gamemode, id]);

    return (
        <div>
            {comments
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((comment) => (
                    <Comment key={comment.id} comment={comment} gamemode={gamemode} id={id} />
                ))}
        </div>
    );
}

function Comment({comment, gamemode, id}){

    async function handleLike(commentid){
        try{
            const commentRef = doc(db, gamemode, id, "comments", commentid);
            await updateDoc(commentRef, {
                like: increment(1)
            });
        } catch(e){
            console.log(e);
        }
    }

    async function handleDelete(commentid, password){

        const input = prompt("비밀번호를 입력해주세요");
        if(input !== password){
            alert("비밀번호가 틀렸습니다.");
            return;
        }
        try{
            await deleteDoc(doc(db, gamemode, id, "comments", commentid));
        } catch(e){
            console.log(e);
        }
    }

    return(
        <div className="flex flex-col">
            <div className="flex text-sm justify-between">
                <div className="font-bold">{comment.username}</div>
                <div>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })}</div>

                <div>{comment.like}</div>

                <div onClick={()=>handleLike(comment.id)} className="text-blue-500 hover:underline cursor-pointer">추천</div>
                <div onClick={()=>handleDelete(commnet.id, comment.password)} className="text-red-500 hover:underline cursor-pointer">삭제</div>
            </div>

            <div>{comment.comment}</div>
        </div>
    )
}