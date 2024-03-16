import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Link to="/auth">로그인 하기</Link>
        )
    } else {
        return (
            <>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                프로필
                </h2>
                <div className="text-sm font-medium leading-none">닉네임 : {user.nickname}</div>{user.permission && <Badge variant="outline" onClick={() => navigate("/admin")}>{user.permission}</Badge>}
                <p className="text-sm">닉네임 설명</p>
                <div className="text-sm font-medium leading-none">이메일 : {user.email}</div>
                <p className="text-sm">이메일 설명</p>
            </>
        )
    }
}