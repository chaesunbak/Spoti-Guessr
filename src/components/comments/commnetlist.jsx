import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase/firebase"
import { useParams } from "react-router-dom";

function Comment({comment}){
    return(
        <div className="flex">
            <div>{comment.username}</div>
            <div>{comment.comment}</div>
            <div>{comment.createdAt}</div>
        </div>
    )
}

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
                    <Comment key={comment.id} comment={comment} />
                ))}
        </div>
    );
}