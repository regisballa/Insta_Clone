<script>
    // Upload-Seite: Bilder hochladen und eigene Bilder verwalten
    let { data, form } = $props();
</script>

<div class="bg-slate-100 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 py-8">

        <h1 class="text-2xl font-extrabold text-slate-900 mb-1">Meine Bilder</h1>
        <p class="text-slate-400 text-sm mb-8">Bilder hochladen und verwalten</p>

        <!-- Upload-Formular -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <h2 class="font-bold text-slate-800 text-sm mb-5">Neues Bild hochladen</h2>

            {#if form?.success}
                <div class="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                    <span>✓</span> Bild erfolgreich hochgeladen!
                </div>
            {/if}
            {#if form?.error}
                <div class="bg-rose-50 border border-rose-100 text-rose-600 text-sm px-4 py-3 rounded-xl mb-4">
                    {form.error}
                </div>
            {/if}

            <form action="?/add" method="POST" enctype="multipart/form-data" class="space-y-4">

                <!-- Beschreibung mit floating label -->
                <div class="relative">
                    <input type="text"
                           name="description"
                           id="description"
                           placeholder=" "
                           class="peer w-full h-12 border border-slate-300 rounded-lg px-3.5 pt-4 pb-1
                                  text-sm text-slate-900 bg-white focus:outline-none
                                  focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" />
                    <label for="description"
                           class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-white px-1
                                  pointer-events-none transition-all duration-200
                                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:font-medium
                                  peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-500">
                        Beschreibung
                    </label>
                </div>

                <!-- File Input -->
                <input type="file"
                       name="image"
                       accept="image/*"
                       required
                       class="w-full text-slate-500 text-sm
                              file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                              file:bg-indigo-600 file:text-white file:font-semibold
                              file:cursor-pointer hover:file:bg-indigo-700 file:text-sm" />

                <button type="submit"
                        class="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white
                               font-semibold rounded-lg transition-colors text-sm">
                    Hochladen
                </button>
            </form>
        </div>

        <!-- Meine Bilder -->
        <h2 class="font-bold text-slate-600 text-xs uppercase tracking-widest mb-3">
            Meine Uploads ({data.images.length})
        </h2>

        {#if data.images.length === 0}
            <div class="bg-white rounded-2xl border border-slate-200 text-center py-14">
                <p class="text-slate-400 text-sm">Noch keine Bilder hochgeladen.</p>
            </div>
        {:else}
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {#each data.images as image (image.id)}
                    <div class="relative group">
                        <!-- Bild-Vorschau -->
                        <a href="/image/{image.id}">
                            <img src={image.image}
                                 alt={image.description ?? 'Bild'}
                                 class="w-full aspect-square object-cover rounded-xl bg-slate-200" />
                        </a>

                        <!-- Löschen-Button erscheint beim Hover -->
                        <form action="?/delete" method="POST"
                              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <input type="hidden" name="imageId" value={image.id} />
                            <button type="submit"
                                    onclick={(e) => { if (!confirm('Bild wirklich löschen?')) e.preventDefault(); }}
                                    class="bg-red-500 hover:bg-red-600 text-white text-xs
                                           font-bold px-2.5 py-1 rounded-lg shadow transition-colors">
                                Löschen
                            </button>
                        </form>

                        <!-- Vote-Zähler -->
                        <div class="absolute bottom-2 left-2 bg-black/50 text-white text-xs
                                    font-semibold px-2 py-0.5 rounded-full">
                            ▲ {image.votes}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>