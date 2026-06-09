<script>
    let { data } = $props();

    // Sicherer Fallback
    const images = data?.images ?? [];
    const topImages = images.slice(0, 3);
    const restImages = images.slice(3);

</script>

<section class="bg-white border-b border-slate-200">
    <div class="max-w-5xl mx-auto px-6 py-14">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>
                <p class="text-indigo-500 text-sm font-semibold uppercase tracking-widest mb-2">Community Feed</p>
                <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Entdecke die<br/>besten Bilder.
                </h1>
                <p class="text-slate-400 mt-3 text-base max-w-sm">
                    Die Community-Favoriten — nach Votes sortiert.
                </p>
            </div>

            {#if !data?.user}
                <div class="flex flex-col gap-3 sm:items-end">
                    <a href="/register"
                       class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center shadow-sm">
                        Jetzt mitmachen
                    </a>
                    <a href="/login"
                       class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors text-sm text-center">
                        Einloggen
                    </a>
                </div>
            {/if}
        </div>
    </div>
</section>

<div class="bg-slate-100 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 py-10">

        <!-- Leerer Zustand -->
        {#if images.length === 0}
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm text-center py-24 px-8">
                <div class="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-slate-800 mb-1">Noch keine Bilder vorhanden</h2>
                <p class="text-slate-400 text-sm mb-8">Sei der Erste und lade etwas hoch!</p>

                {#if data?.user}
                    <a href="/admin/upload"
                       class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm inline-block">
                        Bild hochladen
                    </a>
                {:else}
                    <a href="/register"
                       class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm inline-block">
                        Registrieren &amp; hochladen
                    </a>
                {/if}
            </div>

            {:else}
        {/if}
    </div>
</div>