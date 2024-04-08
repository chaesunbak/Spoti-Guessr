import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useDeleteAccount from '../../hooks/useDeleteAccount';
import useEditProfile from '../../hooks/useEditProfile'
import { useState, useEffect } from 'react';

export default function Acount() {
    const user = useAuthStore((state) => state.user);
    const { editProfile, isUpdating } = useEditProfile()
    const { deleteAccount, isDeleting } = useDeleteAccount();
    const [nickname, setNickname] = useState(user?.nickname);
    const [email, setEmail] = useState(user?.email);

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editProfile({ nickname, email });
    };

    if (!user) {
        return (
            <section className='@container p-2 md:p-3 lg:p-4'>
                <Link to="/auth">로그인 하기</Link>
            </section>
        )
    } else {
        return (
            <section className='@container p-2 md:p-3 lg:p-4'>
                <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>계정</h2>
                <div className="text-sm font-medium leading-none">닉네임 : {user.nickname}</div>
                <div className="text-sm font-medium leading-none">이메일 : {user.email}</div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">프로필 수정하기</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>프로필 수정하기</DialogTitle>
                        <DialogDescription>
                            프로필 정보를 수정합니다.
                        </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                
                                <Label htmlFor="name" className="text-right">
                                닉네임
                                </Label>
                                <Input
                                    id="nickname"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                이메일
                                </Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        </form>
                        <DialogFooter>
                        <Button type="submit">변경사항 저장하기</Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                    <Button type="submit" variant="destructive" disabled={isDeleting} onClick={()=>deleteAccount()}>회원 탈퇴하기</Button>
            </section>
        )
    }
}