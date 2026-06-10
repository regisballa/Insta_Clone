<script>
    // Detailseite: Großes Bild, CSS-Filter, Upvote, Kommentare
    let { data, form } = $props();

    // CSS-Filter State — User kann Filter wählen
    let selectedFilter = $state('none');

    // Verfügbare CSS-Filter
    const filters = [
        { id: 'none',       label: 'Original',  style: 'none' },
        { id: 'grayscale',  label: 'S/W',       style: 'grayscale(100%)' },
        { id: 'sepia',      label: 'Sepia',     style: 'sepia(80%)' },
        { id: 'warm',       label: 'Warm',      style: 'saturate(150%) hue-rotate(-20deg)' },
        { id: 'cool',       label: 'Cool',      style: 'saturate(120%) hue-rotate(40deg)' },
        { id: 'contrast',   label: 'Kontrast',  style: 'contrast(140%) brightness(90%)' },
        { id: 'fade',       label: 'Fade',      style: 'opacity(80%) brightness(110%) saturate(80%)' },
    ];

    // Aktuellen Filter-Style holen
    const currentFilter = $derived(
        filters.find(f => f.id === selectedFilter)?.style ?? 'none'
    );

    // Link kopieren State — zeigt kurz "Kopiert!" an
    let copied = $state(false);

    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href);
        copied = true;
        // Nach 2 Sekunden wieder zurücksetzen
        setTimeout(() => copied = false, 2000);
    }
</script>

<div class="bg-slate-100 min-h-screen">
    <div class="max-w-2xl mx-auto px-4 py-8">

        <a href="/" class="text-slate-400 hover:text-slate-700 text-sm mb-6 inline-flex items-center gap-1 transition-colors">
            ← Zurück
        </a>

        <!-- Bild-Card -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">

            <!-- Autor-Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <a href="/profile/{data.image.username}"
                   class="font-semibold text-slate-800 hover:text-indigo-600 transition-colors text-sm">
                    @{data.image.username}
                </a>

                <div class="flex items-center gap-3">
                    <span class="text-slate-400 text-xs">
                        {new Date(data.image.created_at).toLocaleDateString('de-AT')}
                    </span>

                    <!-- Link kopieren Button -->
                    <button
                        onclick={copyLink}
                        class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all
                               {copied
                                   ? 'bg-green-100 text-green-600'
                                   : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">
                        {#if copied}
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Kopiert!
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                            Link teilen
                        {/if}
                    </button>
                </div>
            </div>

            <!-- Bild mit CSS-Filter -->
            <div class="relative bg-slate-50">
                <img src={data.image.image}
                     alt={data.image.description ?? 'Bild'}
                     class="w-full object-contain max-h-[60vh] transition-all duration-300"
                     style="filter: {currentFilter};" />
            </div>

            <!-- Filter-Buttons -->
            <div class="px-5 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto">
                {#each filters as filter}
                    <button
                        onclick={() => selectedFilter = filter.id}
                        class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                               {selectedFilter === filter.id
                                   ? 'bg-indigo-600 text-white'
                                   : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">
                        {filter.label}
                    </button>
                {/each}
            </div>

            <!-- Beschreibung + Upvote -->
            <div class="px-5 py-4 border-t border-slate-100">
                {#if data.image.description}
                    <p class="text-slate-700 text-sm mb-4">{data.image.description}</p>
                {/if}

                <div class="flex items-center gap-3">
                    {#if data.user && !data.hasVoted}
                        <form action="?/upvote" method="POST">
                            <button type="submit"
                                    class="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700
                                           text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                                ▲ Upvote
                            </button>
                        </form>
                    {:else if data.hasVoted}
                        <span class="flex items-center gap-1.5 bg-slate-100 text-slate-500
                                     px-4 py-2 rounded-lg text-sm">
                            ▲ Bereits gevoted
                        </span>
                    {:else}
                        <a href="/login"
                           class="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200
                                  text-slate-600 px-4 py-2 rounded-lg text-sm transition-colors">
                            ▲ Login zum Voten
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>