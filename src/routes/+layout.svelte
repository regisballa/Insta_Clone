<script>
    // Layout — Header und Footer für alle Seiten
    import './layout.css';

    let { data, children } = $props();

</script>

<div class="min-h-screen flex flex-col bg-slate-50">

    <!-- Hauptinhalt -->
    <main class="flex-1">
        {@render children()}
    </main>

</div>