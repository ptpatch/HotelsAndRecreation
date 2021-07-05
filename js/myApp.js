
//   Working alternative for live price slider value

//function rangeFinder(val) {
//    document.getElementById("showprice").innerHTML = val;
//}                                                           

$(document).ready(function () {

    var hotels = [];
    var filteredHotels = [];


    class Hotel {
        constructor(hotelName, rating, city, thumbnail, guestrating, ratingsNo, ratingText, mapurl, filters, price) {
            this.hotelName = hotelName;
            this.rating = rating;
            this.city = city;
            this.thumbnail = thumbnail;
            this.guestrating = guestrating;
            this.ratingsNo = ratingsNo;
            this.ratingsText = ratingText;
            this.mapurl = mapurl;
            this.filters = filters;
            this.price = price;
        }
    }


    LoadData();

    function LoadData() {
        $.ajax({
            type: "GET",
            url: "data/data.json",
            dataType: "json",
            success: function (response) {
                Application(response);
            }
        });
    }


    function Application(data) {

        db = data;

        var showprice = $("#showprice");

        //                Not working

        //$(function () {
        //    $("#price").slider({
        //        slide: function (e) {
        //            showprice.text($("#price").val());
        //            Manager();
        //        }
        //    });
        //});


        //    Working static-finish slider for price change

        //$("#price").change(function (e) {
        //    showprice.text($("#price").val());
        //    Manager();
        //});

        $("#price").on('input', function () {
            showprice.text($("#price").val());
            Manager();
        });

        $("#searchBtn").click(function (e) {
            e.preventDefault();
            Manager();
        });

        $("#hotelName").keyup(function () {
            Manager();
        });

        $("#property").change(function () {
            Manager();
        })

        $("#guestrating").change(function () {
            Manager();
        })

        $("#city").change(function () {
            Manager();
        })

        $("#sorting").change(function () {
            Manager();
        })



        function Manager() {
            var name = $("#hotelName").val().toLowerCase();
            var price = $("#price").val();
            var rating = $("#property").val();
            var guestrating = $("#guestrating").val();
            var cityval = $("#city").val();
            var citytext = $("#city option:selected").text();
            var sortingval = $("#sorting").val();
            var sortingtext = $("#sorting option:selected").text();
            filterHotels(name, price, rating, guestrating, cityval, citytext, sortingval, sortingtext);       // Too many?
            AppendHotels();
        }


        function AppendHotels() {
            ClearMonitor();
            filteredHotels.forEach(DisplayHotel);
        }


        function filterHotels(name, price, rating, guestrating, cityval, citytext, sortingval, sortingtext) {

            filteredHotels = hotels;

            if (name) {
                filteredHotels = filteredHotels.filter(h => h.hotelName.toLowerCase().includes(name));
            }

            if (price) {
                filteredHotels = filteredHotels.filter(h => h.price < price);
            }

            if (rating) {
                filteredHotels = filteredHotels.filter(h => h.rating == rating);
            }

            if (cityval) {
                filteredHotels = filteredHotels.filter(h => h.city.includes(citytext));
            }

            if (sortingval) {
                filteredHotels = filteredHotels.filter(h => h.filters.find(f => f.name.includes(sortingtext)));
            }

            if (guestrating) {
                switch (guestrating) {
                    case "5": filteredHotels = filteredHotels.filter(h => h.ratings.no > 8.5 && h.ratings.no <= 10);
                        break;
                    case "4": filteredHotels = filteredHotels.filter(h => h.ratingsNo > 7 && h.ratingsNo <= 8.5);
                        break;
                    case "3": filteredHotels = filteredHotels.filter(h => h.ratingsNo > 6 && h.ratingsNo <= 7);
                        break;
                    case "2": filteredHotels = filteredHotels.filter(h => h.ratingsNo > 2 && h.ratingsNo <= 6);
                        break;
                    default: filteredHotels = filteredHotels.filter(h => h.ratingsNo > 0 && h.ratingsNo <= 2);
                        break;
                }
            }


            //if (guestrating) {
            //    if (guestrating == 1)
            //        filteredHotels = filteredHotels.filter(h => h.ratings.no > 0 && h.ratings.no <= 2);
            //    else if (guestrating == 2)
            //        filteredHotels = filteredHotels.filter(h => h.ratings.no > 2 && h.ratings.no <= 6);
            //    else if (guestrating == 3)
            //        filteredHotels = filteredHotels.filter(h => h.ratings.no > 6 && h.ratings.no <= 7);
            //    else if (guestrating == 4)
            //        filteredHotels = filteredHotels.filter(h => h.ratings.no > 7 && h.ratings.no <= 8.5);
            //    else
            //        filteredHotels = filteredHotels.filter(h => h.ratings.no > 8,5 && h.ratings.no <= 10);
            //}
        }


        ClearMonitor();
        function ClearMonitor() {
            var monitor = document.getElementById("monitor");
            monitor.innerHTML = "";
        }

        for (var i of db[1].entries) {
            var hotel = new Hotel(i.hotelName, i.rating, i.city, i.thumbnail, i.guestrating, i.ratings.no, i.ratings.text, i.mapurl, i.filters, i.price);
            hotels.push(hotel);
        }


        hotels.forEach(DisplayHotel);


        function DisplayHotel(hotel) {
            var monitor = document.getElementById("monitor");

            var mapUrl = $("#mapAdd");
            mapUrl.attr('src', hotel.mapurl);

            var text = `<div class="hotel-card">
                <div class="photo" style="background:url(${hotel.thumbnail}); background-position:center" ; >

                    <i class="fa fa-heart"></i>
                <span>1/30</span>
            </div>
                <div class="details">
                    <div class="rating">
                        <h3>${hotel.hotelName}</h3>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>



                    <div class="location">
                        ${hotel.city}, 0.2 miles to ....
                    </div>

                    <div class="reviews">
                        <span class="total">${hotel.ratingsNo}</span>
                        <b>${hotel.ratingsText}</b>
                        <small>(1736 reviews)</small>
                    </div>

                    <div class="location-reviews">
                        Excellent location <small>(9.2/10)</small>
                    </div>
                </div>
                <div class="third-party-prices">
                    <div class="sites-and-prices">
                        <div class="highligted">
                            Hotel website
                            <strong>$706</strong>
                        </div>
                        <div>
                            Agoda
                            <strong>$575</strong>
                        </div>
                        <div>
                            Travelocity
                            <strong>$708</strong>
                        </div>

                    </div>
                    <div class="more-deals">

                        <strong>More deals from</strong>
                        <strong>$575</strong>
                    </div>
                </div>

                <div class="call-to-action">
                    <div class="price">
                        <div class="before-discount">
                            HotelPower.com
                            <strong><s>$1,568</s></strong>
                        </div>
                        <div class="after-discount">
                            Travelocity
                            <strong>$ ${hotel.price}</strong>
                            <div class="total">
                                3 nights for <strong>$3,638</strong>
                            </div>
                            <div class="usp">
                                <span>Free Breakfast</span>
                            </div>
                            <div class="button">
                                <a href="#">View Deal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >`
            monitor.innerHTML += text;
        }
    };
});