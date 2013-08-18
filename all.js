var foodslist;
var matchingslist;
/**
 * 食べ物リストファイルのインポート
 **/
function importFoodsList(){
    console.log("importFoodslist");

 
    var data;//= $('#dat');

    /*
    data = jQuery.get("./foodsitem.txt",null, function(){
        console.log(data.responseText);
    });
    */
   
    data = jQuery.get("foodsitem.txt", null, function() {
        var foodsarray = new Array();
        foodsarray = data.responseText.split("\n");//data.html().split("\n"); //改行で分離
        foodsarray.splice(foodsarray.length - 2, 2); //一度htmlに落とし込んだので、余分な行が入ってるっぽい
        var length = foodsarray.length;
        foodslist = new Array(length);
        console.log("foodslist:"+ 0 + ":" + foodsarray[length-1]);
        var i;
        for(i = 0; i < length; i++){
            var f_array = foodsarray[i].split(",");
            foodslist[i] = f_array;
        }
        console.log("data:"+ foodslist[2][2]);
    /**
     * id=foodslistに一覧を代入
     * */
    //var length = foodslist.length;
    length = foodslist.length;
    console.log("length:" + length);
    var agemono_str ="揚げ物一覧";
    var onigiri_str ="おにぎり一覧";
    var bread_str ="パン一覧";
    var dessert_str ="デザート一覧";

    for(i = 0; i < length; i++){


switch (foodslist[i][2]){
    case "揚げ物":
        agemono_str += "<li onclick=\"getFoofName()\"><a href=\"#recommend\"><p>" + foodslist[i][0] + "</p><p>" + foodslist[i][1] + "キロカロリー</p></li>";
        break;
    case "おにぎり":
        onigiri_str += "<li onclick=\"getFoofName()\"><a href=\"#recommend\"><p>" + foodslist[i][0] + "</p><p>" + foodslist[i][1] + "キロカロリー</p></li>";
        break;
    case "パン":
        bread_str += "<li onclick=\"getFoofName()\"><a href=\"#recommend\"><p>" + foodslist[i][0] + "</p><p>" + foodslist[i][1] + "キロカロリー</p></li>";
        break;
    case "洋菓子":
        dessert_str += "<li onclick=\"getFoofName()\"><a href=\"#recommend\"><p>" + foodslist[i][0] + "</p><p>" + foodslist[i][1] + "キロカロリー</p></li>";
        break; 
    default:
        break;
    }

/*
        "<option value=\"" + i + "\">" + foodslist[i][0]
            +"</option>";
 */
    //   console.log("foodslist[][] = "+ foodslist[i][0]);
    }
        $('#agemonolist').html(agemono_str);
        $('#onigirilist').html(onigiri_str);
        $('#breadlist').html(bread_str);
        $('#dessertlist').html(dessert_str);
    });

};
importFoodsList();

/**
 * おすすめ案提案リストのインポート
 **/
function importMatchingList(){
    console.log("importMatchinglist");
    //var matching = $('#matching');

    var matching;
    matching = jQuery.get("./matching.txt", null, function(){
    //matching.load("matching.txt", function(){
        var matchingsarray = new Array();
        matchingsarray = matching.responseText.split("\n");//matching.html().split("\n");
        matchingsarray.splice(matchingsarray.length - 2, 2);
        var length = matchingsarray.length;
        matchingslist = new Array(length);
        for(var i = 0; i < length; i++){
            var m_array = matchingsarray[i].split(",");
            matchingslist[i] = m_array;
        }
        console.log("matching:" + matchingslist[2][2]);
    });
};
importMatchingList();
/**
 * おすすめ組み合わせ案を表示する機能
 **/
function getRecommendMenu(){
    console.log("matching:" + matchingslist[2]);
 
    var element = document.getElementById("foodslist");
    console.log("選択中のインデックス→"+element.selectedIndex);
    var food_id = element.selectedIndex + 1;
    var health_element = document.getElementById("select-choice-1");
    var health_id = health_element.selectedIndex + 1;
    
    var recommend_menu;
    var instruction;

    var length = matchingslist.length;
    for(var i = 0; i < length; i++){
        if(matchingslist[i][0] == food_id &&
                matchingslist[i][1] == health_id){
            recommend_menu = matchingslist[i][2];
            instruction = matchingslist[i][3];
            break;
        }
    }

    
    $("#recommendMenu").html(recommend_menu);
    
    var sum_calorie =  foodslist[food_id][1]+60; //60は仮。総合
    $("#calorie").html("約" + Math.round(sum_calorie) + "㌔カロリーだが、食べ合わせで約半分のカロリー摂取ほどに!");
    console.log(sum_calorie);

    $("#instruction").html(instruction);
};

