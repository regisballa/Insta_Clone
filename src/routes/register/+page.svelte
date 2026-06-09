<script>
    let { form } = $props();

    let showPassword = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-100 p-5 antialiased font-sans">

    <div class="relative bg-white px-8 py-12 sm:px-10 w-full max-w-[450px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

        <!-- Titel -->
        <div class="relative z-10 mb-10">
            <p class="text-slate-400 text-sm font-medium">Erstelle dein kostenloses Konto</p>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Registrieren</h1>
        </div>

       <!-- Fehlermeldung -->
        {#if form?.error}
            <div class="bg-rose-50 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl mb-6 border border-rose-100 flex items-center gap-2 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 flex-shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{form.error}</span>
            </div>
        {/if}

        <form action="?/register" method="POST" class="space-y-6 relative z-10">

            <!-- Username -->
            <div class="relative">
                <input
                    type="text"
                    id="username"
                    name="username"
                    autocomplete="username"
                    required
                    placeholder=" "
                    class="peer w-full h-12 border border-slate-300 rounded-lg px-3.5 pt-4 pb-1 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <label
                    for="username"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-white px-1 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-500"
                >
                    Username
                </label>
            </div>
    </div>
</div>