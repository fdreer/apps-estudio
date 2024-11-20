// @ts-check
import { defineConfig, envField } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
    output: 'hybrid',
    adapter: cloudflare(),
    site: 'https://estudio.francodreer.com',
    experimental: {
        env: {
            schema: {
                SUPABASE_URL: envField.string({
                    context: 'server',
                    access: 'secret',
                    url: true,
                    optional: false
                }),
                SUPABASE_KEY: envField.string({
                    context: 'server',
                    access: 'secret',
                    optional: false
                })
            }
        }
    }
})
