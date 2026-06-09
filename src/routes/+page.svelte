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