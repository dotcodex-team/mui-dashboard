import Cookies from 'js-cookie'
import { parseCookies } from 'nookies'

export default ({ctx}) => {
    return ctx.req ? getServerToken(ctx) : getLocalToken();
}

function getLocalToken(){
    return Cookies.get("accessToken")
}
function getServerToken(ctx){
    const { accessToken } = parseCookies(ctx);
    return accessToken;
}