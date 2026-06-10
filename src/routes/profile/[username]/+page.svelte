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
    </div>
</div>