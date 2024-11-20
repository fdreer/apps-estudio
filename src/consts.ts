export const APPS: App[] = [
    {
        name: 'Control de Banco',
        description: 'Aplicación para control de bancos',
        link: import.meta.env.PROD
            ? 'https://controlbancos.francodreer.com'
            : 'http://controlbancos.francodreer.com:4322'
    }
] as const
