<script>
    // Admin-Panel: User und Bilder verwalten
    let { data, form } = $props();

    // Tab-State: 'users' oder 'images'
    let activeTab = $state('users');
</script>

<div class="bg-slate-100 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 py-8">

        <!-- Header -->
        <div class="mb-6">
            <div class="flex items-center gap-2 mb-1">
                <span class="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">Admin</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900">Admin-Bereich</h1>
            <p class="text-slate-400 text-sm mt-1">User und Bilder verwalten</p>
        </div>

        <!-- Fehler/Erfolg -->
        {#if form?.error}
            <div class="bg-rose-50 border border-rose-100 text-rose-600 text-sm px-4 py-3 rounded-xl mb-5">
                {form.error}
            </div>
        {/if}

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">User</p>
                <p class="text-3xl font-extrabold text-slate-900">{data.users.length}</p>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Bilder</p>
                <p class="text-3xl font-extrabold text-slate-900">{data.images.length}</p>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Votes</p>
                <p class="text-3xl font-extrabold text-indigo-600">
                    {data.images.reduce((sum, img) => sum + img.votes, 0)}
                </p>
            </div>
        </div>

                <!-- Tabs -->
        <div class="flex bg-white rounded-2xl border border-slate-200 shadow-sm p-1 mb-6 w-fit gap-1">
            <button onclick={() => activeTab = 'users'}
                    class="px-5 py-2 rounded-xl text-sm font-semibold transition-all
                           {activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'}">
                User ({data.users.length})
            </button>
            <button onclick={() => activeTab = 'images'}
                    class="px-5 py-2 rounded-xl text-sm font-semibold transition-all
                           {activeTab === 'images' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'}">
                Bilder ({data.images.length})
            </button>
        </div>

        <!-- User-Tabelle -->
        {#if activeTab === 'users'}
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rolle</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Erstellt</th>
                            <th class="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktion</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        {#each data.users as u (u.id)}
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="px-5 py-3 font-medium text-slate-800">
                                    <a href="/profile/{u.username}" class="hover:text-indigo-600 transition-colors">
                                        @{u.username}
                                    </a>
                                </td>
                                <td class="px-5 py-3">
                                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold
                                        {u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}">
                                        {u.role ?? 'user'}
                                    </span>
                                </td>
                                <td class="px-5 py-3 text-slate-400 text-xs">
                                    {new Date(u.created_at).toLocaleDateString('de-AT')}
                                </td>
                                <td class="px-5 py-3 text-right">
                                    {#if u.id !== data.user.id}
                                        <form action="?/deleteUser" method="POST" class="inline">
                                            <input type="hidden" name="id" value={u.id} />
                                            <button type="submit"
                                                    onclick={(e) => { if (!confirm(`User ${u.username} wirklich löschen?`)) e.preventDefault(); }}
                                                    class="text-red-500 hover:text-red-700 text-xs font-semibold transition-colors">
                                                Löschen
                                            </button>
                                        </form>
                                    {:else}
                                        <span class="text-slate-300 text-xs">Du</span>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

        <!-- Bilder-Grid -->
        {:else}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {#each data.images as image (image.id)}
                    <div class="relative group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <a href="/image/{image.id}">
                            <img src={image.image}
                                 alt={image.description ?? 'Bild'}
                                 class="w-full aspect-square object-cover" />
                        </a>
                        <!-- Info -->
                        <div class="p-2">
                            <p class="text-xs text-slate-500 truncate">@{image.username}</p>
                            <p class="text-xs text-indigo-600 font-semibold">❤️ {image.votes}</p>
                        </div>
                        <!-- Löschen-Button -->
                        <form action="?/deleteImage" method="POST"
                              class="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <input type="hidden" name="id" value={image.id} />
                            <button type="submit"
                                    onclick={(e) => { if (!confirm('Bild wirklich löschen?')) e.preventDefault(); }}
                                    class="bg-red-500 hover:bg-red-600 text-white text-xs
                                           font-bold px-2 py-1 rounded-lg shadow transition-colors">
                                x
                            </button>
                        </form>
                    </div>
                {/each}
            </div>
        {/if}    
    </div>
</div>