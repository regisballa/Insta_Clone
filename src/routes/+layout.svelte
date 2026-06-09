<script>
    // Layout — Header und Footer für alle Seiten
    import './layout.css';

    let { data, children } = $props();

</script>

<svelte:head>
    <link rel="icon" href="/favicon.ico"/>
</svelte:head>

<div class="min-h-screen flex flex-col bg-slate-50">

            <!-- Header -->
            <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

                    <!-- Logo -->
                    <a href="/" class="font-extrabold text-lg text-slate-900 tracking-tight hover:text-indigo-600 transition-colors">
                        SharePics
                    </a>

                <!-- Desktop Nav -->
                <nav class="hidden sm:flex items-center gap-3 text-sm">
                    {#if data.user}
                        <a href="/profile/{data.user.username}"
                        class="text-slate-500 hover:text-slate-900 transition-colors">
                            @{data.user.username}
                        </a>
                        <a href="/admin/upload"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors text-xs">
                            + Upload
                        </a>
                        {#if data.user.role === 'admin'}
                            <a href="/admin"
                            class="text-slate-500 hover:text-indigo-600 transition-colors text-xs font-semibold">
                                Admin
                            </a>
                        {/if}
                        <form action="/logout" method="POST">
                            <button type="submit"
                                    class="text-slate-400 hover:text-red-500 transition-colors text-xs">
                                Logout
                            </button>
                        </form>
                    {:else}
                        <a href="/login" class="text-slate-500 hover:text-slate-900 transition-colors">Login</a>
                        <a href="/register"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors text-xs">
                            Register
                        </a>
                    {/if}
                </nav>
        </header>

        <!-- Hauptinhalt -->
        <main class="flex-1">
            {@render children()}
        </main>
</div>