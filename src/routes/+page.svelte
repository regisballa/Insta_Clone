<script>
    let { data } = $props();

    // Sicherer Fallback
    const images = data?.images ?? [];
    const topImages = images.slice(0, 3);
    const restImages = images.slice(3);

</script>