/* ============================================================
   DUFL — Dialect Film Database
   Film data + filter/sort/render logic
   ============================================================ */

(function () {
  'use strict';

  /* ------ Film Data ------ */
  var films = [
    {
      id: 'ama2026',
      title: '给阿嬷的情书',
      year: 2026,
      dialect: 'minnan',
      dialectLabel: '闽南语（潮汕片）',
      breakthrough: 'national',
      breakthroughLabel: '全民破圈',
      boxOffice: 18.0,
      rating: 9.2,
      posterBg: 'linear-gradient(135deg, #1a3a4a 0%, #2d6a7f 50%, #5a4a3a 100%)',
      posterEmoji: '📮',
      tagline: '侨批·南洋·阿嬷',
      desc: '以潮汕方言为主要对白，融合侨批记忆与南洋华人迁徙史，从1.6%排片逆袭至18亿票房的现象级方言电影。',
      stats: { boxOffice: '18亿', douban: '9.2', overseas: '62国' },
      tags: ['戛纳', '侨批', '祖孙情', '南洋'],
    },
    {
      id: 'flower2024',
      title: '繁花',
      year: 2024,
      dialect: 'shanghainese',
      dialectLabel: '上海话',
      breakthrough: 'national',
      breakthroughLabel: '全民破圈',
      boxOffice: 8.5,
      rating: 8.9,
      posterBg: 'linear-gradient(135deg, #2d1b2e 0%, #4a2c3e 50%, #8b4513 100%)',
      posterEmoji: '🏮',
      tagline: '九十年代·上海滩·沪语',
      desc: '王家卫首部电视剧，全程沪语对白，以上海九十年代为背景，展现了一个时代的市井烟火与商海沉浮。沪语的文化质感成为作品的核心魅力。',
      stats: { boxOffice: '8.5亿', douban: '8.9', overseas: '38国' },
      tags: ['王家卫', '沪语', '年代剧', '茅盾文学奖'],
    },
    {
      id: 'ash2024',
      title: '爱情神话',
      year: 2021,
      dialect: 'shanghainese',
      dialectLabel: '上海话',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 2.6,
      rating: 8.1,
      posterBg: 'linear-gradient(135deg, #3d2b1f 0%, #5c4033 50%, #8b6914 100%)',
      posterEmoji: '🎨',
      tagline: '弄堂·中年·上海味',
      desc: '全沪语对白的都市轻喜剧，以中年人的爱情与友情为线索，展现上海弄堂里的生活质感，在江浙沪地区引发强烈共鸣。',
      stats: { boxOffice: '2.6亿', douban: '8.1', overseas: '12国' },
      tags: ['沪语', '都市', '轻喜剧', '中年'],
    },
    {
      id: 'dust2023',
      title: '隐入尘烟',
      year: 2022,
      dialect: 'other',
      dialectLabel: '西北方言（甘肃）',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 1.1,
      rating: 8.4,
      posterBg: 'linear-gradient(135deg, #4a3a1a 0%, #6b5a2a 50%, #3a2a1a 100%)',
      posterEmoji: '🌾',
      tagline: '土地·农民·西北',
      desc: '以甘肃方言呈现西北农村最朴素的生命质感，两个被各自家庭抛弃的孤独个体在日复一日的耕耘中相濡以沫。方言还原了土地最真实的质感。',
      stats: { boxOffice: '1.1亿', douban: '8.4', overseas: '28国' },
      tags: ['柏林', '文艺片', '农村', '西北'],
    },
    {
      id: 'diao2022',
      title: '人生大事',
      year: 2022,
      dialect: 'wuhan',
      dialectLabel: '武汉话',
      breakthrough: 'national',
      breakthroughLabel: '全民破圈',
      boxOffice: 17.1,
      rating: 7.3,
      posterBg: 'linear-gradient(135deg, #2a2a3a 0%, #4a3a5a 50%, #3a2a4a 100%)',
      posterEmoji: '⭐',
      tagline: '殡葬·市井·武汉',
      desc: '以武汉方言讲述殡葬师与孤儿的故事，将生死命题置于市井烟火之中。武汉话的直爽与幽默消解了题材的沉重感，实现了全年龄段的口碑传播。',
      stats: { boxOffice: '17.1亿', douban: '7.3', overseas: '22国' },
      tags: ['殡葬', '市井', '亲情', '金鸡奖'],
    },
    {
      id: 'yao2021',
      title: '送你一朵小红花',
      year: 2020,
      dialect: 'other',
      dialectLabel: '山东方言/青岛话',
      breakthrough: 'national',
      breakthroughLabel: '全民破圈',
      boxOffice: 14.3,
      rating: 7.5,
      posterBg: 'linear-gradient(135deg, #3a1a1a 0%, #5a2a2a 50%, #7a3a3a 100%)',
      posterEmoji: '🌸',
      tagline: '抗癌·青春·青岛',
      desc: '两个抗癌家庭的故事，青岛方言的使用让严肃题材多了生活化的温度。方言台词在社交媒体上被大量模仿传播，形成二次传播效应。',
      stats: { boxOffice: '14.3亿', douban: '7.5', overseas: '16国' },
      tags: ['抗癌', '青春', '家庭', '青岛'],
    },
    {
      id: 'one2021',
      title: '一直游到海水变蓝',
      year: 2020,
      dialect: 'other',
      dialectLabel: '多方言（山西/陕西/河南/浙江）',
      breakthrough: 'local',
      breakthroughLabel: '本地圈层',
      boxOffice: 0.07,
      rating: 8.1,
      posterBg: 'linear-gradient(135deg, #1a2a4a 0%, #2a3a5a 50%, #4a5a7a 100%)',
      posterEmoji: '📖',
      tagline: '乡土·作家·口述史',
      desc: '贾樟柯执导的文学纪录片，以多地方言呈现贾平凹、余华、梁鸿等作家的口述史。方言成为连接乡土记忆与文学创作的媒介。',
      stats: { boxOffice: '0.07亿', douban: '8.1', overseas: '18国' },
      tags: ['纪录片', '文学', '乡土', '贾樟柯'],
    },
    {
      id: 'dalu2019',
      title: '南方车站的聚会',
      year: 2019,
      dialect: 'wuhan',
      dialectLabel: '武汉话',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 2.0,
      rating: 7.4,
      posterBg: 'linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 50%, #1a2a3a 100%)',
      posterEmoji: '🌧️',
      tagline: '黑色·犯罪·武汉',
      desc: '刁亦男执导的黑色电影，全程武汉方言。在戛纳首映后，影片的"武汉味"成为国际影评人讨论中国电影地方性的重要文本。',
      stats: { boxOffice: '2亿', douban: '7.4', overseas: '35国' },
      tags: ['戛纳', '犯罪', '黑色电影', '刁亦男'],
    },
    {
      id: 'ming2018',
      title: '无名之辈',
      year: 2018,
      dialect: 'other',
      dialectLabel: '西南官话（贵州）',
      breakthrough: 'national',
      breakthroughLabel: '全民破圈',
      boxOffice: 7.9,
      rating: 8.1,
      posterBg: 'linear-gradient(135deg, #3a2a1a 0%, #5a3a2a 50%, #7a4a3a 100%)',
      posterEmoji: '🔫',
      tagline: '小人物·喜剧·贵州',
      desc: '以贵州方言呈现一群"无名之辈"的荒诞一天。方言的喜剧效果与悲剧底色并存，证明方言在商业类型片中的巨大潜力。',
      stats: { boxOffice: '7.9亿', douban: '8.1', overseas: '10国' },
      tags: ['喜剧', '犯罪', '小人物', '贵州'],
    },
    {
      id: 'shan2016',
      title: '山河故人',
      year: 2015,
      dialect: 'other',
      dialectLabel: '山西方言（汾阳）',
      breakthrough: 'local',
      breakthroughLabel: '本地圈层',
      boxOffice: 0.3,
      rating: 8.0,
      posterBg: 'linear-gradient(135deg, #2a3a2a 0%, #3a5a3a 50%, #4a6a4a 100%)',
      posterEmoji: '🏔️',
      tagline: '迁徙·时间·山西',
      desc: '贾樟柯以山西方言讲述跨越26年的离散故事。方言是人物身份的锚点，在全球化背景下成为"故乡"最具体的声景记忆。',
      stats: { boxOffice: '0.3亿', douban: '8.0', overseas: '42国' },
      tags: ['贾樟柯', '戛纳', '离散', '山西'],
    },
    {
      id: 'qiu2017',
      title: '八月',
      year: 2016,
      dialect: 'other',
      dialectLabel: '内蒙古方言（呼和浩特）',
      breakthrough: 'local',
      breakthroughLabel: '本地圈层',
      boxOffice: 0.04,
      rating: 7.8,
      posterBg: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #3a3a3a 100%)',
      posterEmoji: '🎞️',
      tagline: '童年·黑白·呼和浩特',
      desc: '黑白影像中的童年记忆，内蒙古方言赋予影片独特的地域质感。获金马奖最佳影片，是方言文艺片的标杆之作。',
      stats: { boxOffice: '0.04亿', douban: '7.8', overseas: '8国' },
      tags: ['金马奖', '黑白', '童年', '文艺'],
    },
    {
      id: 'luoye2020',
      title: '罗小黑战记',
      year: 2019,
      dialect: 'hakka',
      dialectLabel: '客家话（片段）',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 3.1,
      rating: 8.2,
      posterBg: 'linear-gradient(135deg, #1a3a2a 0%, #2a5a3a 50%, #3a6a4a 100%)',
      posterEmoji: '🐱',
      tagline: '动画·奇幻·客家',
      desc: '国产动画电影中罕见地融入客家方言片段，在二次元社群中引发对方言文化的新关注。证明了方言在动画类型中的可能性。',
      stats: { boxOffice: '3.1亿', douban: '8.2', overseas: '15国' },
      tags: ['动画', '奇幻', '客家', '二次元'],
    },
    {
      id: 'czjh2023',
      title: '从你的全世界路过',
      year: 2016,
      dialect: 'sichuan',
      dialectLabel: '四川话（重庆）',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 8.1,
      rating: 5.3,
      posterBg: 'linear-gradient(135deg, #3a1a2a 0%, #5a2a3a 50%, #7a3a4a 100%)',
      posterEmoji: '🌃',
      tagline: '爱情·都市·重庆',
      desc: '重庆方言在商业爱情片中的大规模使用，重庆话的幽默和热烈为影片注入了独特的城市气质，在西南地区引发观影热潮。',
      stats: { boxOffice: '8.1亿', douban: '5.3', overseas: '6国' },
      tags: ['爱情', '都市', '重庆', '张一白'],
    },
    {
      id: 'knife2025',
      title: '河边的错误',
      year: 2025,
      dialect: 'minnan',
      dialectLabel: '闽南语（福建）',
      breakthrough: 'regional',
      breakthroughLabel: '区域破圈',
      boxOffice: 3.2,
      rating: 8.3,
      posterBg: 'linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 50%, #3a4a5a 100%)',
      posterEmoji: '🔍',
      tagline: '悬疑·乡镇·闽南',
      desc: '改编自余华小说的犯罪悬疑片，以福建闽南方言还原九十年代乡镇氛围。方言增强了悬疑的在地真实感，入围戛纳一种关注单元。',
      stats: { boxOffice: '3.2亿', douban: '8.3', overseas: '24国' },
      tags: ['悬疑', '余华', '戛纳', '90年代'],
    },
  ];

  /* ------ State ------ */
  var filters = {
    dialect: 'all',
    breakthrough: 'all',
    sort: 'boxoffice',
  };

  /* ------ Filter & Render ------ */
  function applyFilters() {
    var filtered = films.filter(function (f) {
      if (filters.dialect !== 'all' && f.dialect !== filters.dialect) return false;
      if (filters.breakthrough !== 'all' && f.breakthrough !== filters.breakthrough) return false;
      return true;
    });

    // Sort
    switch (filters.sort) {
      case 'year':
        filtered.sort(function (a, b) { return b.year - a.year; });
        break;
      case 'rating':
        filtered.sort(function (a, b) { return b.rating - a.rating; });
        break;
      case 'boxoffice':
      default:
        filtered.sort(function (a, b) { return b.boxOffice - a.boxOffice; });
        break;
    }

    renderFilms(filtered);
    updateResultCount(filtered.length);
  }

  function renderFilms(filmList) {
    var grid = document.getElementById('filmGrid');
    if (!grid) return;

    var html = '';
    filmList.forEach(function (f) {
      var badgeClass = '';
      if (f.breakthrough === 'national') badgeClass = 'national';
      else if (f.breakthrough === 'regional') badgeClass = 'regional';
      else badgeClass = 'local';

      html +=
        '<div class="film-card tilt-3d shadow-3d glass" data-tilt-max="8" data-tilt-glare="true">' +
          '<div class="film-card-visual" style="background:' + f.posterBg + '">' +
            '<span>' + f.posterEmoji + '</span>' +
            '<span class="film-poster-tag">' + f.dialectLabel + '</span>' +
          '</div>' +
          '<div class="film-card-body">' +
            '<h3>' + f.title + ' <span style="font-weight:400;font-size:13px;color:var(--text-tertiary)">' + f.year + '</span></h3>' +
            '<div class="film-meta">' +
              '<span>' + f.dialectLabel + '</span>' +
              '<span>豆瓣 ' + f.rating + '</span>' +
            '</div>' +
            '<div class="film-stats">' +
              '<div class="film-stat"><span class="v">' + f.stats.boxOffice + '</span><span class="l">票房</span></div>' +
              '<div class="film-stat"><span class="v">' + f.stats.douban + '</span><span class="l">豆瓣评分</span></div>' +
              '<div class="film-stat"><span class="v">' + f.stats.overseas + '</span><span class="l">海外发行</span></div>' +
            '</div>' +
            '<p class="film-desc">' + f.desc + '</p>' +
            '<div class="film-badges">' +
              '<span class="film-badge ' + badgeClass + '">' + f.breakthroughLabel + '</span>' +
              f.tags.map(function (t) { return '<span class="film-badge" style="background:var(--border-soft);color:var(--text-secondary)">' + t + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
        '</div>';
    });

    grid.innerHTML = html;

    // Re-trigger stagger animation
    grid.classList.remove('visible');
    void grid.offsetWidth;
    grid.classList.add('visible');
  }

  function updateResultCount(count) {
    var el = document.getElementById('resultCount');
    if (el) {
      el.innerHTML = '共 <span>' + count + '</span> 部影片';
    }
  }

  /* ------ Event Listeners ------ */
  var filterOptions = document.querySelectorAll('.filter-options');
  filterOptions.forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.filter-chip');
      if (!chip) return;

      // Update active state in this group
      group.querySelectorAll('.filter-chip').forEach(function (c) {
        c.classList.remove('active');
      });
      chip.classList.add('active');

      // Update filter state
      var filterType = group.getAttribute('data-filter');
      var value = chip.getAttribute('data-value');
      if (filterType && filters.hasOwnProperty(filterType)) {
        filters[filterType] = value;
      }

      applyFilters();
    });
  });

  /* ------ Init ------ */
  applyFilters();

})();
