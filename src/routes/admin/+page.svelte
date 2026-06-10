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
    </div>
</div>