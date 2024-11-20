export const prerender = false

import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
        return new Response('Email and password are required', { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return new Response(error.message, { status: 500 })
    }

    const { access_token, refresh_token } = data.session
    cookies.set('sb-access-token', access_token, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
        path: '/', // Disponible en todo el dominio
        domain: import.meta.env.PROD ? '.francodreer.com' : undefined // Incluye subdominios
    })
    cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        // maxAge: 1000 * 60 * 60,
        path: '/', // Disponible en todo el dominio
        domain: import.meta.env.PROD ? '.francodreer.com' : undefined // Incluye subdominios
    })

    return redirect('/')
}
