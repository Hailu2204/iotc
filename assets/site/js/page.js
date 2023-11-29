(function ($) {
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // PIECHART VIEWS
    // Individual Piecharts instantiated from bottom of page
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    pieView = Backbone.View.extend({
        initialize: function (options) {

            // Chart Settings
            this.width = 100;
            this.height = 100;
            this.radius = 50;

            this.$tooltips = this.$('.pie-chart-tooltips .chart-tooltip');
            this.$legend = this.$('.chart-legend li');
            this.chartHolder = this.$('.the-pie-chart-holder').get(0);

            // Note: Also need to edit these colors in the SCSS Array

            this.color = d3.scaleOrdinal().range([
                '#0E223C',
                '#18325A',
                '#31475A',
                '#435C75',
                '#5D7B9C',
                '#1E6899',
                '#4493CF',
                '#7EBEE8',
                '#FFBC00',
                '#C9912B',
                '#926026',
                '#ABAEB0',
                '#868686',
                '#626366',
                '#464646',
                '#231F20'

]);

            this.data = options.data;

            // Create Chart
            this.createChart();
            this.$('.pie-chart-container, .chart-legend').addClass('initialized');

        },
        createChart: function () {

            var view = this;

            view.svg = d3.select(view.chartHolder).append("svg")
                .attr("width", '100%')
                .attr("height", '100%')
                .attr('viewBox', '0 0 ' + Math.min(view.width, view.height) + ' ' + Math.min(view.width, view.height))
                .attr('preserveAspectRatio', 'xMinYMin')
                .append("g")
                .attr("transform", "translate(" + Math.min(view.width, view.height) / 2 + "," + Math.min(view.width, view.height) / 2 + ")");

            view.arc = d3.arc().innerRadius(view.radius - 23).outerRadius(view.radius);
            view.pie = d3.pie().value(function (d) {
                return d.count;
            }).sort(null);

            // Create Groups and Add Arcs

            view.arcs = view.svg.selectAll('g.slice')
                .data(view.pie(view.data))
                .enter()
                .append('g')
                .attr("class", "slice");

            view.arcs.append('path')
                .attr('d', view.arc)//
                .attr('fill', function (d, i) {
                    return view.color(d.data.label);
                });

            // Center Tooltips on Arcs

            view.arcs.each(function (d, i) {
                var $tt = view.$tooltips.eq(i);
                var c = view.arc.centroid(d);
                var cX = c[0];
                var cY = c[1];
                var x = cX + 50;
                var y = cY + 50;
                $tt.css('left', x + '%');
                $tt.css('top', y + '%');
            });

            // Cache Slices
            this.$slices = this.$('svg g.slice');

        },
        events: function () {
            var events_hash = {
                'mouseover svg g.slice, .pie-chart-list li': 'hoverToolTip',
                'mouseout svg g.slice, .pie-chart-list li': 'unHoverToolTip'
            };
            if (!och.touch) {
                return events_hash;
            }
        },
        hoverToolTip: function (e) {
            var idx = $(e.currentTarget).index();
            this.$slices.eq(idx).addClass('active').siblings().addClass('inactive');
            this.$tooltips.eq(idx).addClass('active').siblings().addClass('inactive');
            this.$legend.eq(idx).addClass('active').siblings().addClass('inactive');
        },
        unHoverToolTip: function (e) {
            this.$tooltips.add(this.$legend).add(this.$slices).removeClass('active inactive');
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // INVESTOR CHART VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    investorView = Backbone.View.extend({
        initialize: function (options) {
            this.$chart = this.$('.the-investors-chart');
            this.$currentQuarter = this.$('.the-investors-chart .years .year:last-child .quarters-container .quarter:last-child .bar');
            this.$figures = this.$('.chart-legend figure span');
            this.$legends = this.$('.chart-legend li');
            this.$captionMonth = this.$('span.caption-month');
            this.$captionYear = this.$('span.caption-year');
            this.currentMonth = this.$captionMonth.data('default');
            this.currentYear = this.$captionYear.data('default');
        },
        events: function () {
            var events_hash = {
                'mouseover .chart-legend li': 'hoverLegend',
                'mouseout .chart-legend li': 'unHoverLegend',
                'mouseover .quarter': 'hoverYear',
                'mouseout .quarter': 'unHoverYear',
                'mouseover .bar': 'hoverBar',
                'mouseout .bar': 'unHoverBar'
            };
            if (!och.touch) {
                return events_hash;
            }
        },
        hoverBar: function (e) {
            if (och.state.mobile) return false;

            $this = $(e.currentTarget);
            category = $this.data('category');
            var $legend = this.$legends.filter('.' + category);
            this.$legends.not($legend).addClass('inactive');
            $legend.addClass('active');
        },
        unHoverBar: function (e) {
            if (och.state.mobile) return false;
            this.$legends.removeClass('active inactive');
        },
        hoverLegend: function (e) {
            if (och.state.mobile) return false;
            $this = $(e.currentTarget);
            category = $this.find('span').data('category');
            var $segment = this.$currentQuarter.filter('.' + category);
            $this.add($segment).addClass('active');
            this.$legends.not($this).addClass('inactive');
            //this.$chart.addClass('segment-active');
        },
        unHoverLegend: function (e) {
            if (och.state.mobile) return false;
            this.$currentQuarter.removeClass('active');
            this.$legends.removeClass('inactive active');
            //this.$chart.removeClass('segment-active');
        },
        hoverYear: function (e) {
            if (och.state.mobile) return false;
            $year = $(e.currentTarget);
            var yearData = $year.data();
            this.$captionMonth.html(yearData.month);
            this.$captionYear.html(yearData.year);
            this.$figures.each(function (index) {
                var $fig = $(this);
                var cat = $fig.data('category');
                $fig.html(yearData[cat] + '%');
            });
        },
        unHoverYear: function (e) {
            if (och.state.mobile) return false;
            $this = $(e.currentTarget);
            this.$captionMonth.html(this.currentMonth);
            this.$captionYear.html(this.currentYonth);
            this.$figures.each(function (index) {
                var $fig = $(this);
                var defaultCat = $fig.data('default');
                $fig.html(defaultCat + '%');
            });
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // TIMELINE VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    timelineView = Backbone.View.extend({
        initialize: function (options) {

            view = this;

            // Add Class to parent Section - Custom CSS fro Gradients
            this.$el.parents('section').addClass('timeline-section').find('.container').append('<div class="och-timeline-buffer"></div>');
            
            // Cache
            this.$timeline = this.$('.the-timeline');
            this.$items = this.$('.timeline-item');
            this.$ticks = this.$('.tick.has-active');
            this.$ticks_container = this.$('.ticks');
            this.$prev = this.$('.prev-timeline');
            this.$next = this.$('.next-timeline');
            this.$ticker_scroll = this.$('.timeline-ticker');
            this.$ticker = this.$('.ticker-container');
            this.$prevMobileDate = this.$('.timeline-nav.prev-timeline .nav-date');
            this.$nextMobileDate = this.$('.timeline-nav.next-timeline .nav-date');

            // State
            this.activeIndex = this.$el.data('startindex');
            this.totalItems = this.$el.data('totalslides');

            // Start Tickers Drag
            Draggable.create(this.$ticker_scroll, {
                type: "scrollLeft",
                throwProps: true,
                minimumMovement: 10
            });

            //Debounced Resize Function
            $(window).on('resize', _.debounce(function () {
                view.resize(view);
            }, 100));

            //Set Active
            view.resize(view);
        },
        resize: function (view) {
            // Set Dimensions

            view.tickerWidth = view.$ticker_scroll.outerWidth();
            view.timelineWidth = view.$timeline.width();

            if (och.state.mobile) {
                this.bigItemWidth = view.timelineWidth;
                this.smallItemWidth = view.timelineWidth;
                this.tickerOffset = null;
            } else if (och.state.tablet) {
                this.bigItemWidth = 575;
                this.smallItemWidth = 375;
                this.tickerOffset = 16; // Represents half the width of a tick
            } else {
                this.bigItemWidth = 565;
                this.smallItemWidth = 365;
                this.tickerOffset = 10;
            }

            // Reset Timeline
            view.moveTimeline();
            this.populateMobileNavDates();
            view.centerCurrentTick();

        },
        events: function () {
            var events_hash = {
                'click .timeline-nav': 'clickArrow',
                'swipeleft .the-timeline': 'swipeTimeline',
                'swiperight .the-timeline': 'swipeTimeline',
                'click .tick.has-active': 'clickTick'
            };

            // Desktop Specific Events
            if (!och.touch) {
                _.extend(events_hash, {
                    'mouseenter .tick.has-active': 'hoverTick',
                    'mouseleave .tick.has-active': 'unHoverTick',
                    'keyup': 'keyboardNavigation'
                });
            }

            return events_hash;
        },
        keyboardNavigation: function (e) {
            if (e.keyCode == 37) {
                this.goNextPrev('prev');
            } else if (e.keyCode == 39) {
                this.goNextPrev('next');
            }
        },
        populateMobileNavDates: function () {
            if (och.state.mobile) {
                $prevSlide = this.$items.eq(this.activeIndex - 1);
                $nextSlide = this.$items.eq(this.activeIndex + 1);
                prevDate = $prevSlide.data('date');
                nextDate = $nextSlide.data('date');
                this.$prevMobileDate.html(prevDate);
                this.$nextMobileDate.html(nextDate);
            }
        },
        swipeTimeline: function (e) {
            if (e.type == 'swiperight') {
                this.goNextPrev('prev');
            } else if (e.type == 'swipeleft') {
                this.goNextPrev('next');
            }
        },
        clickArrow: function (e) {
            var $this = $(e.currentTarget);
            var direction = $this.data('direction');
            this.goNextPrev(direction);
        },
        goNextPrev: function (direction) {
            if ((this.activeIndex == 0 && direction == 'prev') || (this.activeIndex == (this.totalItems - 1) && direction == 'next')) {
                return false;
            }
            var gotoSlide = (direction == 'prev') ? this.activeIndex - 1 : this.activeIndex + 1;
            this.setActive(gotoSlide);
            this.centerCurrentTick();
        },
        setActive: function (idx) {
            this.prevIndex = this.activeIndex;
            this.activeIndex = idx; // Set Active Index

            // Add Remove Active Class To Timeline Item and Related Indicator in Ticker
            this.$items.not(':eq(' + idx + ')').add(this.$ticks.not(':eq(' + idx + ')')).removeClass('active');
            this.$items.eq(idx).add(this.$ticks.eq(idx)).addClass('active').add(this.$ticks_container).removeClass('hovered');

            // Enable / Disable Prev / Next
            this.$prev.toggleClass('disabled', this.activeIndex == 0);
            this.$next.toggleClass('disabled', this.activeIndex == (this.totalItems - 1));

            this.moveTimeline(); // Move Slides to Active Index
            this.populateMobileNavDates();
        },
        moveTimeline: function () {
            itemsBeforeWidth = this.activeIndex * this.smallItemWidth;
            itemsTotalWidth = itemsBeforeWidth + (this.bigItemWidth / 2);

            if (!och.state.mobile) {
                timelineTranslate = -(itemsTotalWidth - (this.timelineWidth / 2));
            } else {
                timelineTranslate = -(itemsBeforeWidth);
            }

            // Tweenlite
            TweenLite.set(this.$timeline, {x: timelineTranslate});

        },
        clickTick: function (e) {
            var $this = $(e.currentTarget);
            var index = $this.data('index');
            this.setActive(index);
        },
        hoverTick: function (e) {
            var $this = $(e.currentTarget);
            var index = $this.data('index');
            if (this.activeIndex == index) {
                return false;
            }
            $this.add(this.$ticks_container).addClass('hovered');
        },
        unHoverTick: function (e) {
            var $this = $(e.currentTarget);
            $this.add(this.$ticks_container).removeClass('hovered');
        },
        centerCurrentTick: function () {
            if (och.state.mobile) {
                return false;
            }
            var $currentTick = this.$ticks.eq(this.activeIndex);
            var posX = $currentTick.position().left;
            var buffer = 100;
            var half = this.tickerWidth / 2;
            var gotoHere = (posX - half) + this.tickerOffset;

            var left = this.$ticker_scroll.scrollLeft();
            var right = this.tickerWidth + left;
            var offScreen = (left >= (posX - buffer) || right <= (posX + buffer)) ? true : false;
            if (offScreen) {
                TweenLite.to(this.$ticker_scroll, 2, {scrollTo: {x: gotoHere}});
            }
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // CIRCLE  ANIMATION VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    circlesView = Backbone.View.extend({
        initialize: function (options) {

            // On animated sprites force width and height to even number
            // responsive fractional pixel dimensions cause jitters

            var view = this;

            this.$sprites = this.$('.sprite');
            //this.$sprites = this.$('.sprite span');
            if (this.$sprites.length) {


                $(window).load(function () {
                    view.resize(view);
                });
                $(window).on('resize', _.debounce(function () {
                    view.resize(view);
                }, 500));
            }
        },
        events: {
            'mouseleave .columns': 'resetAnimation',
        },
        resize: function () {
            this.$sprites.each(function (e) {
                var $sprite = $(this);
                var $icon = $sprite.find('span');

                $icon.attr('style', '').promise().done(function () {
                    var sprite_width = $icon.height();
                    var w = 2 * Math.round(sprite_width / 2);
                    $icon.width(w);
                    $icon.height(w);
                });

            });
        },
        resetAnimation: function (e) {
            var $this = $(e.currentTarget);
            var $sprite = $this.find('.sprite');
            $sprite.removeClass('animation').animate({'nothing': null}, 1, function () {
                $(this).addClass('animation');
            });
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // ACCORIDION  VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    accordionView = Backbone.View.extend({
        initialize: function (options) {
            this.$drawers = this.$('.drawers');
        },
        events: {
            'click .drawer-handle': 'toggleDrawer',
        },
        toggleDrawer: function (e) {
            var $this = $(e.currentTarget);
            $drawer = $this.parent();
            $drawer.toggleClass('active');
            $drawer.find('.drawer-content').slideToggle();
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // HIGHLIGHTS VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    highlightsView = Backbone.View.extend({
        initialize: function (options) {

            $(document).on('lity:open', function (event, lightbox, trigger) {
                var is_accordian = $(trigger).data('accordion');
                if (is_accordian) {
                    var $lightbox = $(lightbox);
                    $lightbox.addClass('highlights-theme');
                    $lightbox.find('.highlights-content').perfectScrollbar();
                }
            });

            $(document).on('lity:ready', function (event, lightbox, ready) {
                $lightbox = $(lightbox);
                if ($lightbox.hasClass('highlights-theme')) {
                    //$lightbox.find('.highlights-scroll').perfectScrollbar();
                }
                //}
            });
        }
    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // LINECHART VIEWS
    // Individual Linecharts instantiated from bottom of page
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    lineView = Backbone.View.extend({
        initialize: function (options) {
            if (!options.el) {
                return;
            }
            this.$el = $(options.el + " .chart-holder"); //define DOM element
            this.data = options.data; // Object Array with chart data
            var Years = [];
            for( i in options.data )
              Years[parseInt(options.data[i].year)] = options.data[i].year;
            this.month = options.month; //Current Month
            this.createChart(Years); // Function to instantiate chart
            var self = this;
            $(window).on("resize", function () {
                self.setDimensions();
                if (self.parentWidth == self.options.defaultWidth) {
                    return;
                }
                self.setScales().resize(Years);
            });
        },
        createChart: function (Years) {
            this.resolveOptions()
                .resolveXtremaVals(["year", "value"])
                .setDimensions()
                .setScales()
                .setGraphLine()
                .drawCanvas()
                .drawYAxis()
                .drawXAxis()
                .drawGraphLine()
                .drawScatterPlots()
                .createTooltips()
                .resize(Years)
        },
        resolveOptions: function () {

            this.options = {
                step: {
                    min: 0,
                    max: 2
                },
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 35,
                    left: 90
                },
                yAxisWidth: 91,
                defaultWidth: 1000
            };

            return this;
        },
        resolveXtremaVals: function (keys) {

            this.xtrema = {};
            for (var i = 0; i < keys.length; i++) {
                this.xtrema[keys[i]] = {
                    "min": d3.min(this.data, function (d) {
                        return parseInt(d[keys[i]]);
                    }),
                    "max": d3.max(this.data, function (d) {
                        return parseInt(d[keys[i]]);
                    })
                };
            }

            return this;
        },
        resolveCurrencyMax: function(value) {

            var max = this.toCurrency(value);
            max.value = Math.ceil(max.value);

            return max.value * max.postfixValue;
        },
        setDimensions: function () {

            this.parentWidth = window.innerWidth > 768 ? this.$el.parent().width() : this.options.defaultWidth;
            this.width = this.parentWidth - this.options.margin.left - this.options.margin.right;
            this.height = 500 - this.options.margin.top - this.options.margin.bottom;

            return this;
        },
        setScales: function () {
            this.resolveCurrencyMax(this.xtrema.value.max);
            this.x = d3.scaleLinear()
                .range([0, this.width])
                .domain([this.xtrema.year.min - 0.5, this.xtrema.year.max + 0.5]);
            this.x1 = d3.scaleLinear()
                .range([0, this.width])
                .domain([0, this.data.length]);
            this.y = d3.scaleLinear()
                .range([this.height, 0])
                .domain([0, this.resolveCurrencyMax(this.xtrema.value.max)]);

            return this;
        },
        setGraphLine: function () {

            var self = this;
            this.valueline = d3.line()
                .x(function (d) {
                    return self.x(parseInt(d.year));
                })
                .y(function (d) {
                    return self.y(d.value);
                });

            return this;
        },
        drawCanvas: function () {
            d3.select(this.$el.find(".chart-content").get(0)).append("svg")
                .append("g")
                .attr("transform",
                    "translate(0, " + this.options.margin.top + ")");

            return this;
        },
        drawYAxis: function () {
            var self = this,
                yaxis = d3.select(this.$el.find(".fixed-axis").get(0));
            yaxis.append("div")
                .attr("class", "fixed-tick");
            yaxis = yaxis.append("svg")
                .attr("height", this.height + this.options.margin.bottom)
                .attr("width", this.options.yAxisWidth + "px");
            yaxis.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(20," + (this.height / 2) + ")rotate(-90)")
                .text("$ Billion");
            yaxis.append("g")
                .attr("transform",
                    "translate(" + this.options.margin.left + "," + this.options.margin.top + ")")
                .attr("name", "y-axis")
                .attr("class", "axis")
                .call(
                    d3.axisLeft(this.y)
                        .tickFormat(function (d) {
                            return self.toCurrency(d).fullValue;
                        })
                );

            return this;
        },
        drawXAxis: function () {
            var canvas = d3.select(this.$el.find(".chart-content").get(0))
                .select("svg")
                .select("g");
            canvas.append("g")
                .attr("name", "x-axis")
                .attr("transform", "translate(0," + this.height + ")")
                .attr("class", "axis");

            canvas.append("g")
                .attr("name", "help-x-axis")
                .attr("transform", "translate(0," + this.height + ")")
                .attr("class", "axis help-axis");

            return this;
        },
        drawGraphLine: function () {

            var element = d3.select(this.$el.find(".chart-content").get(0))
                .select("svg")
                .select("g");
            element.append("g")
                .attr("name", "graph")
                .append("path")
                .data([this.data])
                .attr("class", "line");

            return this;
        },
        drawScatterPlots: function () {

            var self = this;
            var points = d3.select(this.$el.find(".chart-content").get(0))
                .select("svg")
                .select("g")
                .select("[name='graph']")
                .append("g")
                .attr("name", "points")
                .selectAll("dot")
                .data(this.data)
                .enter();

            points.append("circle")
                .attr("class", "point")
                .attr("r", 5);

            points.append("circle").attr("r", 15)
                .attr("fill", "transparent")
                .on("mouseover", function (d) {
                    if (!d.value) {
                        return;
                    }

                    self.tooltip
                        .style("left", (parseInt($(this).attr("cx")) + 32) + "px")
                        .style("top", (parseInt($(this).attr("cy"))) + "px")
                        .transition()
                        .duration(300)
                        .style("opacity", 1);
                    self.tooltip.selectAll('.tooltip-content').html(self.toCurrency(d.value, false).fullValue);
                })
                .on("mouseout", function () {
                    self.tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                });

            return this;
        },
        createTooltips: function () {

            this.tooltip = d3.select(this.$el.find('.chart-content').get(0))
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
            this.tooltip.append("div")
                .attr("class", "tooltip-content");

            return this;
        },
        toCurrency: function (value, ui) {

            var dividers = [
                    {
                        postfix: "B",
                        value: 1e9
                    },
                    {
                        postfix: "M",
                        value: 1e6
                    },
                    {
                        postfix: "K",
                        value: 1e3
                    }
                ],
                spacer = ui ? " " : "",
                temp = 0,
                result = {fullValue:"", value: value, postfix: "B", postfixValue: 1e9};

                
            
            for (var i = 0; i < dividers.length; i++) {
                if (temp = value / dividers[i].value) {
                    result.value = temp.toFixed(1);
                    result.postfix = dividers[i].postfix;
                    result.postfixValue = dividers[i].value;
                    result.fullValue = "$" + temp.toFixed(1) + spacer + dividers[i].postfix;
                    used_postfix = dividers[i].postfix;
                    break;
                }
            }
            
            if(used_postfix) {
              if(value == 0) {
                result.fullValue = "$" + temp.toFixed(1) + spacer + used_postfix;
              }
            }
            

            return result;
        },
        resize: function (Years) {
            var self = this;
            var canvas = d3.select(this.$el.find(".chart-content").get(0))
                .select("svg")
                .attr("width", this.width - this.options.yAxisWidth - 1 + this.options.margin.left + this.options.margin.right)
                .attr("height", this.height + this.options.margin.top + this.options.margin.bottom)
                .select("g");


            //scale xAxis
            canvas.select("[name='x-axis']").call(
                d3.axisBottom(this.x)
                    .tickFormat(function(d) { return Years[d]; })
                    .tickPadding("10")
                    .tickSize(0, 0)
                    .tickValues(d3.range(this.xtrema.year.min, this.xtrema.year.max + 1))
            );
            canvas.select("[name='help-x-axis']").call(
                d3.axisBottom(this.x1)
                    .tickSize(30, 0)
                    .tickValues(d3.range(0, this.data.length+1))
            );

            //scale graph
            canvas.select("[name='graph']").select("path").attr("d", this.valueline);

            canvas.select("[name='graph']")
                .select("[name='points']")
                .selectAll("circle")

                .attr("cx", function (d) {
                    return self.x(parseInt(d.year));
                })
                .attr("cy", function (d) {
                    return self.y(d.value);
                });
            return this;
        }

    });

    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // TOOLTIP VIEW
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    tooltipsView = Backbone.View.extend({
        initialize: function (options) {
            this.$tips = this.$('.circ-tip');

            maxsize = (och.state.mobile) ? 280 : 320,

                this.$tips.tooltipster({
                    delay: 0,
                    trigger: (och.touch) ? 'click' : 'hover',
                    //trigger: 'click',
                    IEmin: 9,
                    theme: 'och-tips',
                    maxWidth: maxsize,
                    side: ['top'],
                    functionPosition: function (instance, helper, position) {

                        var win_width = helper.geo.window.size.width;

                        // Resize to ensure 20px of padding on small views

                        /*
                         var diff = (helper.geo.window.size.width - 40) - position.size.width;

                         if(diff < 0) {
                         var widthOffset = Math.abs(diff);
                         position.size.width -= widthOffset;

                         // Adjust height
                         var contentHeight = $(helper.tooltip).find('.highlight-tooltip').outerHeight();
                         console.log($(helper.tooltip).find('.highlight-tooltip').height());
                         position.size.height += 40; // increase height to fit
                         position.coord.top -= 40;
                         }
                         */

                        var distFromRight = helper.geo.window.size.width - (position.size.width + position.coord.left);

                        if (distFromRight < 20) {
                            // Too Close to Right
                            var rightOffset = 20 - distFromRight;
                            position.coord.left -= rightOffset;
                        } else if (position.coord.left < 20) {
                            // Too Close to Left
                            var leftOffset = 20 - position.coord.left;
                            position.coord.left += leftOffset;
                        }
                        return position;

                    }

                });
        }
    });


    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/
    // CAROUSEL GALLERY (BASED ON CAREERS GALLERY)
    /* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -*/

    galleryCaroView = Backbone.View.extend({
        initialize: function (options) {
            var view = this;
            this.$caroSlider = this.$('.gallery-caro-slider');
            this.$caroPopup = this.$('.gallery-popup');
            this.$popup = this.$('.photo-slideshow-popup');
            this.$popupID = this.$popup.attr('id');
            this.$caroMobileLabel = this.$(".caro-label");
            this.$popCaption = this.$('.pop-caption');

            // Before Move
            this.$caroSlider.on('translate.owl.carousel', function (e) {
                view.beforeMove(e);
            });

            // After Move & Resize
            this.$caroSlider.on('translated.owl.carousel resized.owl.carousel', function (e) {
                view.afterMove(e);
            });

            this.$caroSlider.owlCarousel({
                'nav': true,
                'items': 7,
                'navText': ['<span class="icon-go"></span>', '<span class="icon-go"></span>'],
                'responsive': {
                    320: {'items': 1},
                    768: {'items': 3},
                    971: {'items': 4},
                    1181: {'items': 5},
                    1381: {'items': 6},
                    1561: {'items': 7}
                },
                'navRewind': false,
                'mouseDrag': false,
                'animateOut': 'fadeOut'
            });

            this.$owlItems = this.$caroSlider.find('.owl-item');

            this.fixOwlBug();

            // Popup
            this.$caroPopup.owlCarousel({
                'items': 1,
                'nav': true,
                'autoHeight': true,
                'loop': true,
                'dots': true,
                'navText': ['<i class="icon-go"></i>', '<i class="icon-go"></i>'],
            });

            this.$caroPopup.on('translate.owl.carousel', function (e) {
                var caption = view.$caroPopup.find(".owl-item").eq(e.item.index).find('> div').data('caption');
                view.$popCaption.html(caption);
            });

        },
        events: {
            'click .click-slide': 'clickSlide',
        },
        updatePopCaption: function (idx) {
            var $slide = this.$caroPopup.find('[data-index="' + idx + '"]').first();
            var caption = $slide.data('caption');
            this.$popCaption.html(caption);
        },
        clickSlide: function (e) {
            if (!och.state.mobile) {
                var idx = $(e.currentTarget).data('index');
                this.updatePopCaption(idx);
                this.$caroPopup.trigger('to.owl.carousel', [idx, 0]);
                this.lightbox = lity('#' + this.$popupID);
            }
        },
        updateProfileButton: function (e) {
            var text = this.$owlItems.filter('.active').find('.slide .title span').html();
            this.$caroMobileLabel.html(text);
        },
        beforeMove: function (e, view, owl) {
            this.fixOwlBug();
            $(e.target).addClass('moving');
        },
        afterMove: function (e) {
            var view = this;
            this.fixOwlBug();
            this.updateProfileButton();
            setTimeout(function () {
                view.$caroSlider.removeClass('moving');
            }, 100);
        },
        fixOwlBug: function () {
            var owl = this.$caroSlider.data('owl.carousel');
            if (owl != undefined) {
                this.$caroSlider.find('.owl-item.active').eq(owl.settings.items).removeClass('active');
            }
        },
    });

/*	$('.management-filters select').select2({
		minimumResultsForSearch: -1,
		width: '100%',
		containerCssClass: "filter-select"
	}).on("select2:open", function () {
		if(!och.touch) {
			$('.select2-results__options').perfectScrollbar();
		}
	}); */
	$(document).on('click','#load_more',function() {
		$('#page_loading').addClass('loading-in-progress');
		var postsCount = $('#posts').children().length;
		$.get('/news/press-releases/news-load?Skip='+postsCount,function(data) {
			$('#posts').append(data);
			if( postsCount + 5 > $('#posts').attr('data-count') )
				$('#page_loading').hide();
			else
				$('#page_loading').removeClass('loading-in-progress');
		});
	});
/*	$('#category_selection select').select2({
		minimumResultsForSearch: -1,
		width: '50%',
		containerCssClass: "filter-select"
	}).on("select2:select", function () {
		if(!och.touch) {
			$('.select2-results__options').perfectScrollbar();
		}
	}); */
	$(document).on('change','#catpage_select',function() {
		$('#posts').load('/news/press-releases/news-load?Year='+$(this).val());
		if( $(this).val() !== '' )
			$('#page_loading').hide();
		else
			$('#page_loading').show();
	});
	$(document).on('change','#cat_select',function() {
		if( $(this).val() != '' ) {
			$(this).parents(':eq(1)').find('h2').text($(this).find('option:selected').text());
			$('#posts > div').hide();
			$('.'+$(this).val()).show();
		} else {
			$(this).parents(':eq(1)').find('h2').text('Video Channel');
			$('#posts > div').show();
		}
	});
	if( $('#cat_select').val() != '' )
		$('#cat_select').change();
})(jQuery);