import { ref } from "vue";
import supabase from "../supabase";
import { useRouter } from "vue-router";

export function useAuth() {
  const router = useRouter();
  const user = ref(null);
  const isLogin = ref(false);

  const checkLoginStatus = async () => {
    const { data: { user: _user }, } = await supabase.auth.getUser();
    user.value = _user;
    
    if (_user) {
        console.log("로그인 상태");
        isLogin.value = true;
    } else {
        console.log("로그아웃 상태");
        isLogin.value = false;
        alert("로그인 후 이용해 주세요.");
        router.push("/");
    }
  };

  return { user, isLogin, checkLoginStatus };
}