export const prerender = false

import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData()
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString().trim()

    if (!email || !password) {
        return new Response('Email and password are required', { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        const { status, code, message } = error
        console.log(status, code, message)

        return new Response(error.message, { status })
    }

    const { access_token, refresh_token } = data.session
    cookies.set('sb-access-token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/', // Disponible en todo el dominio
        domain: import.meta.env.PROD ? '.francodreer.com' : undefined // Incluye subdominios
    })
    cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/', // Disponible en todo el dominio
        domain: import.meta.env.PROD ? '.francodreer.com' : undefined // Incluye subdominios
    })

    return redirect('/')
}
