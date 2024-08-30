import AddCommentForm from "./addcommentform"
import CommentList from "./commnetlist"

export default function CommentSection(){
    return (
        <section id="comments">
            <AddCommentForm />
            <CommentList />
        </section>
    )
}