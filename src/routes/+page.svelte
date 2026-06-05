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

            <!-- Top 3 -->
            {#if topImages.length > 0}
                <div class="mb-10">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Bilder</h2>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {#each topImages as image, i (image.id)}
                            <a href="/image/{image.id}"
                               class="group relative overflow-hidden rounded-2xl bg-slate-200 block shadow-sm
                                      {i === 0 ? 'sm:row-span-2' : ''}">

                                <img src={image.image}
                                     alt={image.description ?? 'Bild'}
                                     class="w-full {i === 0 ? 'h-72 sm:h-full' : 'h-52'} object-cover
                                            transition-transform duration-500 group-hover:scale-105" />

                                <!-- Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent
                                            opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <!-- Badge -->
                                <div class="absolute top-3 left-3">
                                    {#if i === 0}
                                        <span class="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">🥇 #1</span>
                                    {:else if i === 1}
                                        <span class="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full shadow">🥈 #2</span>
                                    {:else}
                                        <span class="bg-orange-200 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">🥉 #3</span>
                                    {/if}
                                </div>

                                <!-- Info -->
                                <div class="absolute bottom-0 left-0 right-0 p-4">
                                    {#if image.description}
                                        <p class="text-white text-sm font-semibold truncate mb-1">{image.description}</p>
                                    {/if}
                                    <div class="flex items-center justify-between">
                                        <span class="text-white/70 text-xs">@{image.username}</span>
                                        <span class="text-amber-300 text-xs font-bold bg-black/30 px-2 py-0.5 rounded-full">
                                            ▲ {image.votes}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Rest der Bilder -->
            {#if restImages.length > 0}
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                        <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Alle Bilder</h2>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {#each restImages as image (image.id)}
                            <a href="/image/{image.id}"
                               class="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 block shadow-sm">

                                <img src={image.image}
                                     alt={image.description ?? 'Bild'}
                                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                            transition-opacity duration-200 flex flex-col justify-end p-3">
                                    {#if image.description}
                                        <p class="text-white text-xs font-medium truncate mb-1">{image.description}</p>
                                    {/if}
                                    <div class="flex items-center justify-between">
                                        <span class="text-white/70 text-xs">@{image.username}</span>
                                        <span class="text-amber-300 text-xs font-bold">▲ {image.votes}</span>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>