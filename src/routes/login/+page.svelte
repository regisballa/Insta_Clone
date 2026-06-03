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
        </div>

        <!-- Fehlermeldung -->
            {#if form?.error}
                <div class="flex items-center gap-2 bg-red-950 border border-red-800
                            text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
                    <span>⚠</span>
                    <span>{form.error}</span>
                </div>
            {/if}
    </div>
</div>