//Isotope: http://isotope.metafizzy.co/

function initiso() {
  // init Isotope
  var $container = $('.grid').isotope({
    itemSelector: '.item'
  });
  
  $container.imagesLoaded().progress( function() {
  $container.isotope('layout');
  });


  // filter with selects
  var $selects = $('#filters select');

  $selects.change( function() {
    // map input values to an array
    var exclusives = [];
    // exclusive filters from selects
    $selects.each( function( i, elem ) {
      if ( elem.value ) {
        exclusives.push( elem.value );
      }
    });

    // combine exclusives
    filterValue = exclusives.join('');

    $container.isotope({ filter: filterValue });
  });

  
}

