<script>
    let { form } = $props();
</script>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
        <!-- Logo -->

        <div class="text-center mb-8">
            <a href="/" class="text-4xl font-bold text-white tracking-tight hover:text-amber-400 transition-colors">
                Pixagram
            </a>
            <p class="text-zinc-500 text-sm mt-2">Melde dich an und teile deine Bilder</p>
        </div>

        <!-- Card -->

        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h1 class="text-xl font-semibold text-white mb-6">Login</h1>

        <!-- Fehlermeldung -->
            {#if form?.error}
                <div class="flex items-center gap-2 bg-red-950 border border-red-800
                            text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
                    <span>⚠</span>
                    <span>{form.error}</span>
                </div>
            {/if}
                <form action="?/login" method="POST" class="space-y-4">


                <!-- Username -->

                <div>

                    <label for="username" class="block text-zinc-400 text-sm mb-1.5">
                        Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        autocomplete="username"
                        placeholder="dein_username"
                        class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    />
                </div>



                <!-- Passwort -->

                <div>
                    <label for="password" class="block text-zinc-400 text-sm mb-1.5">
                        Passwort
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"/>
                </div>



                <!-- Submit -->

                <button
                    type="submit"
                    class="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-900 font-bold py-3 rounded-xl transition-colors mt-2">
                    Einloggen
                </button>
            </form>
        </div>



        <!-- Link zu Register -->

        <p class="text-center text-zinc-500 text-sm mt-6">
            Noch kein Konto?
            <a href="/register" class="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                Jetzt registrieren
            </a>

        </p>
    </div>
</div>