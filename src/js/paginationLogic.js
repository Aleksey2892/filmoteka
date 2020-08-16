import refs from './refs';
import { onNextBtn } from './gallery';


export default function paginationLogic(totalPage) {
    // console.log(totalPage);
    /* * * * * * * * * * * * * * * * *
     * Pagination
     * javascript page navigation
     * * * * * * * * * * * * * * * * */

    var Pagination = {

        code: '',

        // --------------------
        // Utility
        // --------------------

        // converting initialize data
        Extend: function (data) {
            data = data || {};
            Pagination.size = data.size || 1000;
            Pagination.page = data.page || 1;
            Pagination.step = data.step || 2;
        },

        // add pages by number (from [s] to [f])
        Add: function (s, f) {
            for (var i = s; i < f; i++) {
                Pagination.code += '<a>' + i + '</a>';
            }
        },

        // add last page with separator
        Last: function () {
            Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
        },

        // add first page with separator
        First: function () {
            Pagination.code += '<a>1</a><i>...</i>';
        },



        // --------------------
        // Handlers
        // --------------------

        // change page
        Click: function () {
            Pagination.page = +this.innerHTML;
            Pagination.Start();
        },

        // previous page
        Prev: function () {
            Pagination.page--;
            if (Pagination.page < 1) {
                Pagination.page = 1;
            }
            Pagination.Start();
        },

        // next page
        Next: function () {
            Pagination.page++;
            if (Pagination.page > Pagination.size) {
                Pagination.page = Pagination.size;
            }
            Pagination.Start();
            refs.listFilms.textContent = '';
            onNextBtn();
        },



        // --------------------
        // Script
        // --------------------

        // binding pages
        Bind: function () {
            var a = Pagination.e.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
                a[i].addEventListener('click', Pagination.Click, false);
            }
        },

        // write pagination
        Finish: function () {
            Pagination.e.innerHTML = Pagination.code;
            Pagination.code = '';
            Pagination.Bind();
        },

        // find pagination type
        Start: function () {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            }
            else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            }
            else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            }
            else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();
        },



        // --------------------
        // Initialization
        // --------------------

        // binding buttons
        Buttons: function (e) {
            var nav = e.getElementsByTagName('a');
            nav[0].addEventListener('click', Pagination.Prev, false);
            nav[1].addEventListener('click', Pagination.Next, false);
        },

        // create skeleton
        Create: function (e) {

            var html = [
                '<a id="prev-btn" class="start-prev-page arrow arrow-left"></a>', // previous button
                '<span class="pag-number"></span>',  // pagination container
                '<a id="next-btn" class="start-next-page arrow arrow-right"></a>'  // next button
            ];

            e.innerHTML = html.join('');
            Pagination.e = e.getElementsByTagName('span')[0];
            Pagination.Buttons(e);
        },

        // init
        Init: function (e, data) {
            Pagination.Extend(data);
            Pagination.Create(e);
            Pagination.Start();
        }
    };

    // const totalPages = data.data.pages

    /* * * * * * * * * * * * * * * * *
    * Initialization
    * * * * * * * * * * * * * * * * */

    const pageSize = totalPage;
    const selectedPage = 1;
    // console.log(pageSize);

    // console.log(setting.size);
    var init = function () {
        const setting = {
            size: pageSize, // pages size
            page: selectedPage,  // selected page
            step: 2  // pages before and after current
        };
        Pagination.Init(document.getElementById('pagination'), setting);

        // console.log(setting);
    };

    document.addEventListener('DOMContentLoaded', init(), false);

};