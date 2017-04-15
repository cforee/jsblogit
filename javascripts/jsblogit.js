BlogEntries = [
  {
    date: '2017-04-14',
    title: 'test one',
    body: 'asdf asdf asdf asdf asdf asdf asdf asdf',
    attribution: 'chris'
  },
  {
    date: '2017-04-13',
    title: 'test two',
    body: 'asdfa sdf asdf asdfjdskafhgaksdjgh asdkjfh asdkjf',
    attribution: 'chris f.'
  }
];

JSBlogIt = {
  app_container_elem: 'jsblogit',
  manifest_name: 'manifest',
  source_url: null,
  data: null,
  $app_container: null,
  $manifest: null,
  $entries: null,

  // initializer
  //
  init: function(source_url) {
    self = this;
    self.source_url = source_url;
    self.$app_container = $('#' + self.app_container_elem);
    self.$manifest = $('<div class="' + self.manifest_name + '"></div>').appendTo(self.$app_container);
    $content = $('<main></main>').appendTo(self.$app_container);
    self.$entries = $('<section></section>').appendTo($content);
    return true;

  },

  // fade in the containing element
  //
  fade_in: function() {
    self = this;
    self.$app_container.animate({ opacity: '1.0' }, 400);
    return true;

  },

  // fetch n number blog entries
  //
  fetch: function(n) {
    self = this;
    console.log(self.source_url);
    self.data = function() {
      $.get(self.source_url, function(data, status) {
        $(self.$manifest).html(data);
      })
    }();
    return this.data;

  },

  assign: function(response) {

  },

  // render the blog
  //
  render: function(source_url) {
    self = this;
    self.init(source_url);
    self.fetch(2);
    $.map(this.data, function(entry) {
      $this_entry = $('<article></article>').appendTo(self.$entries);
      $this_entry.html(entry);
    });

    self.fade_in();
    return true;

  }

}


$(function() { JSBlogIt.render('https://cforee.github.io/tgiaw/'); });
