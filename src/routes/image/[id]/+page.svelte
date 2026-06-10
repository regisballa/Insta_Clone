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