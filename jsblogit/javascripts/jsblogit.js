JSBlogIt = {
  app_container_elem: 'jsblogit',
  manifest_url: 'manifest',
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
    self.$manifest = $('<div class="' + self.manifest_url + '"></div>')
      .appendTo(self.$app_container);
    $content = $('<main></main>').appendTo(self.$app_container);
    self.$entries = $('<section></section>').appendTo($content);
    return true;

  },

  // random url junk for cache-busting
  //
  cache_buster: function() {
    noise = (
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7)
    );
    return noise;

  },

  // fade in the containing element
  //
  fade_in: function() {
    self = this;
    self.$app_container
      .animate({ opacity: '1.0' }, 400);
    return true;

  },

  // sort article dom elements by key
  //
  sort_articles: function() {
    self = this;
    articles = self.$entries.children('article');
    sorted_ids = $.map(articles, function(article) {
      return '#' + $(article).attr('id')
    }).sort().reverse();
    $.map(sorted_ids, function(article_id) {
      $(article_id).detach().appendTo(self.$entries);
    });
    return true;

  },

  // render the blog
  //
  render: function(opts) {
    self = this;

    self.source_url = opts.source_url ? opts.source_url : null;
    self.manifest_url = opts.manifest_url ? opts.manifest_url : null;

    self.init(self.source_url);

    noise = self.cache_buster();

    $.get(self.manifest_url, function(data) {
      urls = $.map(data.split(','), function(data) {
        return data.trim();
      });
      if (urls.length > 0) {
        $.map(urls, function(url) {
          url = self.source_url + url + '?' + noise;

          $.get(url, function(entry) {
            lines = entry.split("\n");
            headers = lines.shift().split('|');
            body = $.map(lines, function(line) {
              return marked(line);
            })

            article = {
              meta: {
                title: headers[0].trim(),
                attribution: headers[1].trim(),
                published_at: headers[2].trim()
              },
              body: body

            };

            $article = $('<article id="' +
              article.meta.published_at.replace(/:/g,'_') +
                '"></article>').appendTo(self.$entries);
            $summary = $('<section class="meta"></section>')
              .appendTo($article);
            if (article.meta.title.length > 0) {
              $('<div class="title">' +
                  article.meta.title +
                '</div>').appendTo($summary);
            }
            $('<div class="attribution">' +
                article.meta.attribution +
              '</div>').appendTo($summary);
            if (article.meta.published_at.split('T')[0] != '9999-99-99') {
              $('<div class="published">' +
                  article.meta.published_at.split('T')[0] +
                '</div>').appendTo($summary);
            }
            $body = $('<div class="body"></div>')
              .appendTo($article);
            $body.html(article.body);

            self.sort_articles();

          });

        });
      }

    }).done(self.fade_in());
    return true;

  }

}
