removeItem = (path) => {
    $.ajax({
      type:'DELETE',
      url: path,
      success: function(response){
        alert('Register deleted...');
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
    });
}