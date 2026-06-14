<script>
    // Profil-Seite: Zeigt alle Bilder eines Users
    let { data } = $props();
</script>

<div class="bg-slate-100 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 py-8">

        <!-- Profil-Header -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 flex items-center gap-4">
            <!-- Avatar mit Initiale -->
            <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center
                        text-indigo-600 font-extrabold text-2xl flex-shrink-0">
                {data.profileUser.username[0].toUpperCase()}
            </div>
            <div>
                <h1 class="text-xl font-extrabold text-slate-900">@{data.profileUser.username}</h1>
                <p class="text-slate-400 text-sm mt-0.5">{data.images.length} Bilder</p>
            </div>
        </div>

        <!-- Bilder-Grid -->
        {#if data.images.length === 0}
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm text-center py-20 px-8">
                <p class="text-slate-400 text-sm">Noch keine Bilder hochgeladen.</p>
            </div>
        {:else}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {#each data.images as image (image.id)}
                    <a href="/image/{image.id}"
                       class="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 block shadow-sm">
                        <img src={image.image}
                             alt={image.description ?? 'Bild'}
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <!-- Hover-Overlay mit Vote-Anzahl -->
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-200 flex items-end p-3">
                            <span class="text-amber-300 text-xs font-bold">❤️ {image.votes}</span>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>