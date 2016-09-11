$(function() {
    $('#n').keyup(function() {
        var n = $(this).val();
        if (n !== '') {
            $.getJSON('/is_prime/' + n)
                .done(function(data) {
                    $('#result').text(data ? 'Prime' : 'Composite');
                })
                .fail(function() {
                    $('#result').text('Error');
                });
        } else {
            $('#result').text('');
        }
    });
});
