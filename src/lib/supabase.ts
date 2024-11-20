import type { AstroCookies } from 'astro'
import { SUPABASE_URL, SUPABASE_KEY } from 'astro:env/server'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const authenticate = async (cookies: AstroCookies) => {
    const accessToken = cookies.get('sb-access-token')
    const refreshToken = cookies.get('sb-refresh-token')

    if (!accessToken || !refreshToken) {
        return { isAuth: false }
    }

    // Comprobamos si los tokens existen y son válidos
    const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value
    })

    if (!error) {
        return {
            isAuth: true
        }
    }

    cookies.delete('sb-access-token', { path: '/' })
    cookies.delete('sb-refresh-token', { path: '/' })

    return { isAuth: false }
}
