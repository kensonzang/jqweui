 var httpurl="http://139.129.235.232:8080/majiang/";
    var token="";
    var user;
    var goods;
    var owmlist=[],userlist=[],playerslist=[],daililist=[],datesklist=[],monthsklist=[];

    $(function () {
        $(".tab4").hide();
        $(".tab7").hide();
        $(".adddailiBtn").click(function () {
            $(".dailiguanliBtn").show();
            $(".adddailiBtn").hide();
            $(".adddailidiv").show();
            $(".dailiguanlidiv").hide();
        })
        $(".dailiguanliBtn").click(function () {
            $(".dailiguanliBtn").hide();
            $(".adddailiBtn").show();
            $(".adddailidiv").hide();
            $(".dailiguanlidiv").show();
        })
        $(".goukapaihangBtn").click(function () {
            $(".goukapaihangBtn").hide();
            $(".goukapaihangdiv").show();

            $(".wanjiaguanlidiv").hide();
            $(".wanjiaguanliBtn").show();
            if(user.id=="admin")
            {
                $(".kaifangpaihangdiv").hide();
                $(".kaifangpaihangBtn").show();
            }
        })
        $(".wanjiaguanliBtn").click(function () {
            $(".wanjiaguanliBtn").hide();
            $(".wanjiaguanlidiv").show();

            $(".goukapaihangBtn").show();
            $(".goukapaihangdiv").hide();

            if(user.id=="admin")
            {
                $(".kaifangpaihangdiv").hide();
                $(".kaifangpaihangBtn").show();
            }
        })
        $(".kaifangpaihangBtn").click(function () {
            $(".wanjiaguanliBtn").show();
            $(".wanjiaguanlidiv").hide();

            $(".goukapaihangBtn").show();
            $(".goukapaihangdiv").hide();
            
            $(".kaifangpaihangdiv").show();
            $(".kaifangpaihangBtn").hide();
        })
        $(".benyueBtn").click(function () {
            $(".benyuediv").show();
            $(".jinridiv").hide();
            $(".jinriBtn").show();
            $(".benyueBtn").hide();
        })
        $(".jinriBtn").click(function () {
            $(".benyuediv").hide();
            $(".jinridiv").show();
            $(".jinriBtn").hide();
            $(".benyueBtn").show();
        })
        //登录
        $(".loginBtn").click(function () {
            $.showLoading("正在登录...");
            $.ajax({ type: "post",
                url:httpurl+"admin/login",
                data:"id="+$(".loginidtxt").val()+"&pwd="+$(".loginpwdtxt").val(),
                success:function(info){
                    $.hideLoading();
                    if(info.code == "000000")
                    {
                        token=info.token;
                        user=info.user;
                        goods=info.goods;
                        $.toast("登录成功！", 'success');
                        $(".login-tab").hide();
                        $(".weui_tab").show();
                        if(user.groups!="s")
                        {

                            $(".tab4").remove();
                            $(".chongkaBtn").remove();
                            $(".tab2").remove();
                            $(".kaifangpaihangBtn").remove();
                        }
                        $(".ownidtxt").val(user.id);
                        $(".ownnametxt").val(user.name);
                        $(".ownteltxt").val(user.phone);
                        $(".ownbanktxt").val(user.bank);
                        $(".ownzfbtxt").val(user.zhifubao);
                        $(".ownwxtxt").val(user.weixin);
                        if(goods.length)
                        {
                            if(goods[0].type=="roundtype_4")
                            {
                                $(".own4txt").val(goods[0].value);
                                if(goods.length>1)
                                    $(".own8txt").val(goods[1].value);
                                else
                                    $(".own8txt").val("0");
                            }else
                            {
                                $(".own8txt").val(goods[0].value);
                                if(goods.length>1)
                                    $(".own4txt").val(goods[1].value);
                                else
                                    $(".own4txt").val("0");
                            }
                        }
                       
                        initdata();
                       
                    }else if(info.code == "000002"){
                        $.toptip('帐号密码错误', 'error');
                    }else
                    {
                        $.toptip(info.msg, 'error');
                    }
                },
                error: function () {
                    $.hideLoading();
                    $.toptip('连接不上服务器', 'error');
                }
            });
        })
        // $(".loginidtxt").val("")
        // $(".loginpwdtxt").val("")
        // $(".loginBtn").click();
        //增加代理
        $(".addBtn").click(function () {
            if($(".addidtxt").val()==""||$(".addpwdtxt").val()==""||$(".addnametxt").val()==""||$(".addwxtxt").val()==""||$(".addbanktxt").val()==""||$(".addteltxt").val()=="")
            {
                $.toptip("请输入信息");
                return;
            }
            $.showLoading();
            $.ajax({ type: "post",
                url:httpurl+"admin/add",
                data:"id="+$(".addidtxt").val()+"&pwd="+$(".addpwdtxt").val()+"&name="+$(".addnametxt").val()+"&token="+token+
                        "&weixin="+$(".addwxtxt").val()+"&bank="+$(".addbanktxt").val()+"&phone="+$(".addteltxt").val()+"&zhifubao="+$(".addzfbtxt").val(),
                success:function(info){
                    $.hideLoading();
                    if(info.code == "000000")
                    {
                        $.toast("添加成功！", 'success');
                        getAgentList();
                        $(".addidtxt").val("");
                        $(".addpwdtxt").val("");
                        $(".addnametxt").val("");
                        $(".addwxtxt").val("");
                        $(".addbanktxt").val("");
                        $(".addzfbtxt").val("");
                        $(".addteltxt").val("");
                    }else
                    {
                        $.toptip(info.msg, 'error');
                    }
                },
                error: function () {   $.hideLoading();
                    $.toptip('连接不上服务器', 'error'); }
            });
        })
        //充卡界面
        $(".chongkaBtn").click(function () {
            $(".tab4").click();
        })
        //充卡
        $(".tijiaoBtn").click(function () {
            if($(".numtxt").val()=="")
            {
                $.toptip("数量不能为空", 'error');
                return;
            }
            $.showLoading();
            $.ajax({ type: "post",
                url:httpurl+"admin/recv",
                data:"agentid="+user.id+"&num="+$(".numtxt").val()+"&type="+$(".fangkatype").val()+"&token="+token,
                success:function(info){
                    $.hideLoading();
                    if(info.code == "000000")
                    {
                        $.toast("成功！", 'success');
                        addList($(".fangkatype").val(),$(".numtxt").val());
                        addcard($(".fangkatype").val(),$(".numtxt").val());
                        $(".numtxt").val("");
                        $(".tab3").click();
                    }else
                    {
                        $.toptip(info.msg, 'error');
                    }
                },
                error: function () {   $.hideLoading();
                    $.toptip('连接不上服务器', 'error'); }
            });
        })
        //玩家充卡
        $(".userchongBtn").click(function () {
            if($(".useridtxt").val()==""||$(".usernumtxt").val()=="")
            {
                $.toptip("玩家id和数量不能为空", 'error');
                return;
            }
            //xian chaxuan wanjia zai tishi 
             $.ajax({ type: "post",
                url:httpurl+"admin/getUserList",
                data:"token="+token+"&bizid="+$(".useridtxt").val(),
                success:function(info){
                    
                    if(info.rows.length==0){
                        $.toptip('玩家不存在', 'error');
                        $.toast('玩家不存在', 'forbidden');
                        return;
                    }
                    player=info.rows[0];
                    var fangkaxinxi="";
                    for (var i = 0; i <player.goods.length; i++) {
                        if(player.goods[i].type=="roundtype_4")
                        {
                            fangkaxinxi+="四圈房卡："+player.goods[i].value+"张          ;";
                        }
                         if(player.goods[i].type=="roundtype_8")
                        {
                            fangkaxinxi+="八圈房卡："+player.goods[i].value+"张          ;";
                        }
                    }
                    if(player.goods.length==0)
                    {
                        fangkaxinxi+="四圈房卡：0张          ;";
                        fangkaxinxi+="八圈房卡：0张          ;";
                    }else if(player.goods.length==1)
                    {
                        if(fangkaxinxi.indexOf("四圈房卡")!=-1)
                        {
                             fangkaxinxi+="八圈房卡：0张          ;";
                         }else {
                             fangkaxinxi+="四圈房卡：0张          ;";
                         }
                    }
                    $.confirm({
                        title: '确定帮玩家'+player.name+"充卡?",
                        text: '玩家:'+player.name+'   ;    id：'+player.bizid+'   ;    '+fangkaxinxi,
                        onOK: function () {
                            $.showLoading();
                            $.ajax({ type: "post",
                                url:httpurl+"admin/usecard",
                                data:"bizid="+$(".useridtxt").val()+"&num="+$(".usernumtxt").val()+"&type="+$(".usertype").val()+"&token="+token,
                                success:function(info){
                                    $.hideLoading();
                                    if(info.code == "000000")
                                    {
                                        $.toast("成功！", 'success');
                                        adduserList($(".usertype").val(),$(".usernumtxt").val(),$(".useridtxt").val());
                                        delcard($(".usertype").val(),$(".usernumtxt").val());
                                        $(".useridtxt").val("");
                                        $(".usernumtxt").val("");
                                        initdata()
                                    }else
                                    {
                                        $.toast(info.msg, 'forbidden');
                                        $.toptip(info.msg, 'error');
                                    }
                                },
                                error: function () {   $.hideLoading();
                                    $.toptip('连接不上服务器', 'error'); }
                            });
                        },
                        onCancel: function () {
                        }
                    });
                },
                error: function () {   $.hideLoading();
                    $.toptip('连接不上服务器', 'error'); }
            });
           
            
        })
        //搜索
        $(".suosou").click(function () {
            if($(".searchbizidtxt").val()=="")
            {
                $.toptip("请输入玩家id", 'error');
                return;
            }
            $.ajax({ type: "post",
                    url:httpurl+"admin/getUserList",
                    data:"token="+token+"&bizid="+$(".searchbizidtxt").val(),
                    success:function(info){
                        
                        if(info.rows.length==0){
                            $.toptip('玩家不存在', 'error');
                            $.toast('玩家不存在', 'forbidden');
                            return;
                        }
                        player=info.rows[0];
                        var fangkaxinxi="";
                        for (var i = 0; i <player.goods.length; i++) {
                            if(player.goods[i].type=="roundtype_4")
                            {
                                fangkaxinxi+="4圈房卡："+player.goods[i].value+"张          ;";
                            }
                             if(player.goods[i].type=="roundtype_8")
                            {
                                fangkaxinxi+="8圈房卡："+player.goods[i].value+"张          ;";
                            }
                        }
                        $.alert({
                            title: '玩家：'+player.name,
                            text: 'id：'+player.bizid+'   ;    '+fangkaxinxi,
                            onOK: function () {
                                //点击确认
                            }
                        });
                    },
                    error: function () {   $.hideLoading();
                        $.toptip('连接不上服务器', 'error'); }
            });
           
        })
        //搜索
        $(".agenttijiaoBtn").click(function () {
            if($(".agentnumtxt").val()=="")
            {
                $.toptip("数量不能为空", 'error');
                return;
            }
            $.showLoading();
            $.ajax({ type: "post",
                url:httpurl+"admin/recv",
                data:"agentid="+dailiname+"&num="+$(".agentnumtxt").val()+"&type="+$(".agentfangkatype").val()+"&token="+token,
                success:function(info){
                    $.hideLoading();
                    if(info.code == "000000")
                    {
                        $.toast("成功！", 'success');
                        $.closePopup();
                    }else
                    {
                        $.toptip(info.msg, 'error');
                    }
                },
                error: function () {   $.hideLoading();
                    $.toptip('连接不上服务器', 'error'); }
            });
           
        })
    })
    
    function initdata(){
        getcardlist();
        getplayerlist();
        getdatesklist();
        getmonthsklist();
        getowntoday();
        getownmonth();
        getowntotal();
        if(user.groups=="s")
        {
            getAgentList();
            getUserList();
            getUseCards();
            $(".touwanjiadiv").remove();
        }else{

            $(".touadminwanjiadiv").remove();
        }
    }
    //查询开房排行榜
    function getUseCards() 
    {
         $.ajax({ type: "post",
            url:httpurl+"admin/useTop",
            data:"token="+token+"&rows=10000",
            success:function(info){
                
                $(".kaifangDiv").children().remove();
                var k=info.rows.length;
                for(var i=0;i<k;i++)
                {
                    var  div='<div class="weui_cell">'+
                                            '<div class="weui_cell_bd weui_cell_primary">'+
                                               '<div class="weui-row">'+
                                                  '<div class="weui-col-33">'+info.rows[i].bizid+'</div>'+
                                                  '<div class="weui-col-33">'+info.rows[i].name+'</div>'+
                                                  '<div class="weui-col-33">'+info.rows[i].value+'</div>'+
                                                '</div>'+
                                            '</div>'+
                                          '</div>'
                      
                    $(".kaifangDiv").append(div);
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    //如果是admin就加载所有的玩家到玩家列表
    function getUserList() 
    {
         $.ajax({ type: "post",
            url:httpurl+"admin/getUserList",
            data:"token="+token+"&rows=10000",
            success:function(info){
                
                $(".playersDiv").children().remove();
                var k=info.rows.length;
                for(var i=0;i<k;i++)
                {
                    
                    var  div='<div class="weui_cell">'+
                                            '<div class="weui_cell_bd weui_cell_primary">'+
                                               '<div class="weui-row">'+
                                                  '<div class="weui-col-20">'+info.rows[i].bizid+'</div>'+
                                                  '<div class="weui-col-30">'+info.rows[i].name+'</div>'+
                                                  '<div class="weui-col-50">'+info.rows[i].pwd+'</div>'+
                                                '</div>'+
                                            '</div>'+
                                          '</div>'
                    $(".playersDiv").append(div);
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    //zijid zong ka shu
    function getowntotal() 
    {
         $.ajax({ type: "post",
            url:httpurl+"admin/saleTop",
            data:"token="+token+"&id="+user.id,
            success:function(info){
               
               if(info.rows[0])
                    $(".totaltxt").text(info.rows[0].num);
                else
                    $(".totaltxt").text("0");
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function getownmonth() 
    {
        $.ajax({ type: "post",
            url:httpurl+"admin/saleTop",
            data:"token="+token+"&id="+user.id+"&beginTime="+monthTime(),
            success:function(info){
               
               if(info.rows[0])
                    $(".monthtxt").text(info.rows[0].num);
                else
                    $(".monthtxt").text("0");
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function getowntoday() 
    {
        $.ajax({ type: "post",
            url:httpurl+"admin/saleTop",
            data:"token="+token+"&id="+user.id+"&beginTime="+todayTime(),
            success:function(info){
               
               if(info.rows[0])
                    $(".todaytxt").text(info.rows[0].num);
                else
                    $(".todaytxt").text("0");
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    //shoukapaihang--------------------------
    function getdatesklist()
    {
        $.ajax({ type: "post",
            url:httpurl+"admin/saleTop",
            data:"token="+token+"&rows=20"+"&beginTime="+todayTime(),
            success:function(info){
                $.hideLoading();
                $(".dateskdiv").children().remove();
                if(info.rows)
                {
                    if(info.rows.length>0)
                    {
                        datesklist=info.rows;
                        datesklist.sort(function(a,b){
                                    return b.num-a.num});
                        var k=datesklist.length;
                        for(var i=0;i<k;i++)
                        {
                            if(datesklist[i].id=="admin")
                                continue;
                            var  div= '<div class="weui_cell">'+
                                    '<div class="weui_cell_bd weui_cell_primary">'+
                                       '<div class="weui-row">'+
                                         '<div class="weui-col-50">'+datesklist[i].name+'</div>'+
                                          '<div class="weui-col-50">'+datesklist[i].num+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                  '</div>'
                            $(".dateskdiv").append(div);
                            
                        }
                    }
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function getmonthsklist()
    {
        $.showLoading("正在加载数据...");
        $.ajax({ type: "post",
            url:httpurl+"admin/saleTop",
            data:"token="+token+"&rows=20"+"&beginTime="+monthTime(),
            success:function(info){
                $.hideLoading();
                $(".monthskdiv").children().remove();
                if(info.rows)
                {
                    if(info.rows.length>0)
                    {
                        monthsklist=info.rows;
                        monthsklist.sort(function(a,b){
                                    return b.num-a.num});
                        var k=monthsklist.length;
                        for(var i=0;i<k;i++)
                        {
                            if(monthsklist[i].id=="admin")
                                continue;
                            var  div= '<div class="weui_cell">'+
                                    '<div class="weui_cell_bd weui_cell_primary">'+
                                       '<div class="weui-row">'+
                                         '<div class="weui-col-50">'+monthsklist[i].name+'</div>'+
                                          '<div class="weui-col-50">'+monthsklist[i].num+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                  '</div>'
                            $(".monthskdiv").append(div);
                        }
                    }
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    //daili--------------------------
    function getAgentList()
    {
        $.showLoading("正在加载数据...");
        $.ajax({ type: "post",
            url:httpurl+"admin/getAgentList",
            data:"token="+token+"&rows=1000",
            success:function(info){
                $.hideLoading();
                if(info.rows)
                {
                    if(info.rows.length>0)
                    {
                        daililist=info.rows;

                        setdaililist(daililist);
                    }
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function setdaililist()
    {
        $(".daililistDiv").children().remove();
        var k=daililist.length;
        for(var i=0;i<k;i++)
        {
            if(daililist[i].id=="admin")
                continue;
            var div;
            if(daililist[i].freeze=="0"||daililist[i].freeze==null)
            {
                 div='<div class="weui_cell">'+
                        '<div class="weui_cell_bd weui_cell_primary" id='+daililist[i].id+' onclick="onSeachdaili(this)">'+
                          '<p>'+daililist[i].name+'</p>'+
                       ' </div>'+
                        '<div class="weui_cell_ft">'+
                         '  <a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_primary" id='+
                         daililist[i].id+' name='+daililist[i].name+' onclick="onAgentChongka(this)" >充卡</a>'+
                         '  <a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_warn" id='+
                         daililist[i].id+' name='+daililist[i].name+' onclick="onFreeze(this)" >冻结</a>'+
                        '</div>'+
                    '</div>'
                }else
                {
                     div='<div class="weui_cell" id='+daililist[i].id+' onclick="onSeachdaili(this)">'+
                        '<div class="weui_cell_bd weui_cell_primary">'+
                          '<p>'+daililist[i].name+'</p>'+
                       ' </div>'+
                        '<div class="weui_cell_ft">'+
                         '  <a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_primary" id='+
                         daililist[i].id+' name='+daililist[i].name+' onclick="onRemovefreeze(this)">解冻</a>'+
                        '</div>'+
                    '</div>'
                }
            $(".daililistDiv").append(div);
        }
    }
      //查选代理
    function onSeachdaili(o){
        
        $.ajax({ type: "post",
            url:httpurl+"admin/queryAgent",
            data:"token="+token+"&id="+o.getAttribute("id"),
            success:function(info){
                if(info)
                {
                    $(".tab7").click();
                   // $.alert("本月售卡:"+info.sale[0].num+"张  ;  上卡:"
                   //  +info.buy[0].num+"张","玩家："+info.agent.name+"  ;  id:"+info.agent.id)
                    $(".dailiownidtxt").val(info.agent.id);
                    $(".dailiownnametxt").val(info.agent.name);
                    $(".dailiownteltxt").val(info.agent.phone);
                    $(".dailiownbanktxt").val(info.agent.bank);
                    $(".dailiownwxtxt").val(info.agent.weixin);
                    var goods=info.agent.goods;
                    if(goods.length)
                    {
                        if(goods[0].type=="roundtype_4")
                        {
                            $(".dailiown4txt").val(goods[0].value);
                            if(goods.length>1)
                                $(".dailiown8txt").val(goods[1].value);
                            else
                                $(".dailiown8txt").val("0");
                        }else
                        {
                            $(".dailiown8txt").val(goods[0].value);
                            if(goods.length>1)
                                $(".dailiown4txt").val(goods[1].value);
                            else
                                $(".dailiown4txt").val("0");
                        }
                    }else{
                         $(".dailiown4txt").val("0");
                         $(".dailiown8txt").val("0");
                    }
                    $.ajax({ type: "post",
                        url:httpurl+"admin/saleTop",
                        data:"token="+token+"&id="+info.agent.id+"&beginTime="+todayTime(),
                        success:function(info){
                           
                           if(info.rows[0])
                                $(".dailitodaytxt").text(info.rows[0].num);
                            else
                                $(".dailitodaytxt").text("0");
                        },
                        error: function () {   $.hideLoading();
                            $.toptip('连接不上服务器', 'error'); }
                    });
                    $.ajax({ type: "post",
                        url:httpurl+"admin/saleTop",
                        data:"token="+token+"&id="+info.agent.id+"&beginTime="+monthTime(),
                        success:function(info){
                           
                           if(info.rows[0])
                                $(".dailimonthtxt").text(info.rows[0].num);
                            else
                                $(".dailimonthtxt").text("0");
                        },
                        error: function () {   $.hideLoading();
                            $.toptip('连接不上服务器', 'error'); }
                    });
                    $.ajax({ type: "post",
                        url:httpurl+"admin/saleTop",
                        data:"token="+token+"&id="+info.agent.id,
                        success:function(info){
                           
                           if(info.rows[0])
                                $(".dailitotaltxt").text(info.rows[0].num);
                            else
                                $(".dailitotaltxt").text("0");
                        },
                        error: function () {   $.hideLoading();
                            $.toptip('连接不上服务器', 'error'); }
                    });
                    $.ajax({ type: "post",
                        url:httpurl+"admin/getCardList",
                        data:"token="+token+"&rows=100000&agentid="+info.agent.id,
                        success:function(info){
                            if(info.rows)
                            {

                                var list=[];
                                if(info.rows.length>0)
                                {
                                    var k=info.rows.length;
                                    for(var i=0;i<k;i++)
                                    {
                                        if(info.rows[i].bizid)
                                        {
                                        }
                                        else
                                        {
                                            list.push(info.rows[i]);
                                        }
                                    }
                                }
                                var totolnum=0;
                                var todaynum=0;
                                var monthnum=0;
                                var daytime=upmonthTime();
                                var montime=hengmonthTime();
                                
                                for(var i=0;i<list.length;i++)
                                {
                                   totolnum+=Number(list[i].num);
                                   if(list[i].createTime.indexOf(daytime)!=-1)
                                   {
                                     todaynum+=Number(list[i].num);
                                   }
                                   if(list[i].createTime.indexOf(montime)!=-1)
                                   {
                                     monthnum+=Number(list[i].num);
                                   }
                                }
                                $(".dailitotaljintxt").text(totolnum);
                                $(".dailimonthjintxt").text(monthnum);
                                $(".dailiupmonthjintxt").text(todaynum);
                            }
                        },
                        error: function () {   $.hideLoading();
                            $.toptip('连接不上服务器', 'error'); }
                    });
                   
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
      //冻结
    function onFreeze(o){
        
        // alert("自定义的消息内容");
        $.confirm("确定要冻结代理:"+o.getAttribute("name"), function() {
             sendfreeze("1",o.getAttribute("id"));
        }, function() {
          //点击取消后的回调函数
        });
        return false;
    }
    function sendfreeze(num,id)
    {
        // http://180.76.173.116:8080/majiang/admin/freeze?id=333&freeze=0&token=admin1477410458765   freeze冻结1  解冻0
        $.showLoading("正在加载数据...");
        $.ajax({ type: "post",
            url:httpurl+"admin/freeze",
            data:"id="+id+"&token="+token+"&freeze="+num,
            success:function(info){
                $.hideLoading();
                $.toast("操作成功");
                getAgentList();
            },
            error: function () {  
                $.hideLoading();
                $.toptip('连接不上服务器', 'error'); 
            }
        });
    }
      //解冻
    function onRemovefreeze(o){
        $.confirm("确定要解除冻结代理:"+o.getAttribute("name"), function() {
             sendfreeze("0",o.getAttribute("id"));
        }, function() {
          //点击取消后的回调函数
        });
        return false;
    }
    var dailiname="";
    //代理充卡
    function onAgentChongka(o){
        dailiname=o.getAttribute("id");
        $("#agentck").popup();
        $(".agentname").text('为代理<'+o.getAttribute("name")+'>充卡');
        return false;
    }

    
    // wanjia--------------------------ss
    function getplayerlist()
    {
        $.showLoading("正在加载数据...");
        var str=user.id;
        if(user.id=="admin")
        {
            str=""
        }
        $.ajax({ type: "post",
            url:httpurl+"admin/buyTop",
            data:"status="+"&token="+token+"&rows=10000&id="+str,
            success:function(info){
                $.hideLoading();
                if(info.rows)
                {
                    if(info.rows.length>0)
                    {
                        playerslist=info.rows;
                        setplayerlist();
                    }
                }
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function setplayerlist()
    {
        $(".playersDiv").children().remove();
        $(".playerpaihangDiv").children().remove();
        var k=playerslist.length;
        for(var i=0;i<k;i++)
        {
            
            var  div='<div class="weui_cell">'+
                                    '<div class="weui_cell_bd weui_cell_primary">'+
                                       '<div class="weui-row">'+
                                          '<div class="weui-col-50">'+playerslist[i].id+'</div>'+
                                          '<div class="weui-col-50">'+playerslist[i].name+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                  '</div>'
              
            $(".playersDiv").append(div);
        }
        playerslist.sort(function(a,b){
            return b.num-a.num});
        for(var i=0;i<k;i++)
        {
            
            var  div='<div class="weui_cell">'+
                                    '<div class="weui_cell_bd weui_cell_primary">'+
                                       '<div class="weui-row">'+
                                          '<div class="weui-col-33">'+playerslist[i].id+'</div>'+
                                          '<div class="weui-col-33">'+playerslist[i].name+'</div>'+
                                          '<div class="weui-col-33">'+playerslist[i].num+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                  '</div>'
              
            $(".playerpaihangDiv").append(div);
        }
    }
    // chongzhijilu-------------------
    function getcardlist()
    {
        $.showLoading("正在加载数据...");
        var str="";
        if(user.id=="admin")
        {
            str=""
        }else {
            str=user.id;
        }
        $.ajax({ type: "post",
            url:httpurl+"admin/getCardList",
            data:"token="+token+"&rows=100000&agentid="+str,
            success:function(info){
                $.hideLoading();
                if(info.rows)
                {
                    if(info.rows.length>0)
                    {
                        var k=info.rows.length;
                        owmlist=[];
                        userlist=[];
                        for(var i=0;i<k;i++)
                        {
                            if(info.rows[i].bizid)
                            {
                                userlist.push(info.rows[i]);
                            }
                            else
                            {
                                if(info.rows[i].agentid==user.id)
                                    owmlist.push(info.rows[i]);
                            }
                        }
                    }
                }
                setList();
                setjinka();
            },
            error: function () {   $.hideLoading();
                $.toptip('连接不上服务器', 'error'); }
        });
    }
    function setjinka(){
        var k=owmlist.length;
        var totolnum=0;
        var todaynum=0;
        var monthnum=0;
        var daytime=upmonthTime();
        var montime=hengmonthTime();
        for(var i=0;i<k;i++)
        {
           totolnum+=Number(owmlist[i].num);
           if(owmlist[i].createTime.indexOf(daytime)!=-1)
           {
             todaynum+=Number(owmlist[i].num);
           }
           if(owmlist[i].createTime.indexOf(montime)!=-1)
           {
             monthnum+=Number(owmlist[i].num);
           }
        }
        $(".totaljintxt").text(totolnum);
        $(".monthjintxt").text(monthnum);
        $(".upmonthjintxt").text(todaynum);

    }
    function setList(){
        $(".owmlists").children().remove();
        $(".userlists").children().remove();
        var k=owmlist.length>10?10:owmlist.length;
        for(var i=0;i<k;i++)
        {
            var leixing=owmlist[i].type=="roundtype_4"?"四圈房卡":"八圈房卡"
            var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>数量:'+owmlist[i].num+'</p>'+
                    '  <p>类型:'+leixing+'</p>'+
                '</div><div class="weui_cell_ft">'+owmlist[i].createTime+'</div></div>'
            $(".owmlists").append(div);
        }
        if(k==10)
        {
            $("#tab3").infinite(10).on("infinite", function() {
                if(k>=owmlist.length) {
                    $("#tab3").destroyInfinite();
                    $(".owmlistscroll").remove();
                    return;
                }
                var leixing=owmlist[k].type=="roundtype_4"?"四圈房卡":"八圈房卡"
                var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>数量:'+owmlist[k].num+'</p>'+
                        '  <p>类型:'+leixing+'</p>'+
                        '</div><div class="weui_cell_ft">'+owmlist[k].createTime+'</div></div>'
                $(".owmlists").append(div);
                k++;
            });
        }else
        {
            $(".owmlistscroll").remove();
        }
        var y=userlist.length>10?10:userlist.length;
        for(var i=0;i<y;i++)
        {
            var leixing=userlist[i].type=="roundtype_4"?"四圈房卡":"八圈房卡"
            var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>玩家id:'+userlist[i].bizid+'</p><p>数量:'+userlist[i].num+'</p>'+
                    '  <p>类型:'+leixing+'</p>'+
                    '</div><div class="weui_cell_ft">'+userlist[i].createTime+'</div></div>';
            $(".userlists").append(div);
        }
        if(y==10)
        {
            $("#tab1").infinite(10).on("infinite", function() {
                if(y>=userlist.length) {
                    $("#tab1").destroyInfinite();
                    $(".userlistscroll").remove();
                    return;
                }
                var leixing=userlist[y].type=="roundtype_4"?"四圈房卡":"八圈房卡"
                var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>玩家id:'+userlist[y].bizid+'</p><p>数量:'+userlist[y].num+'</p>'+
                        '  <p>类型:'+leixing+'</p>'+
                        '</div><div class="weui_cell_ft">'+userlist[y].createTime+'</div></div>';
                $(".userlists").append(div);
                y++;
            });
        }else
        {
            $(".userlistscroll").remove();
        }
    }
    function addList(type,num){
         var leixing=type=="roundtype_4"?"四圈房卡":"八圈房卡"
            var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>数量:'+num+'</p>'+
                    '  <p>类型:'+leixing+'</p>'+
                '</div><div class="weui_cell_ft">'+CurentTime()+'</div></div>'
            $(".owmlists").prepend(div);
    }
    function adduserList(type,num,bizid){
        var leixing=type=="roundtype_4"?"四圈房卡":"八圈房卡"
        var div='<div class="weui_cell"><div class="weui_cell_bd weui_cell_primary"><p>玩家id:'+bizid+'</p><p>数量:'+num+'</p>'+
                '  <p>类型:'+leixing+'</p>'+
                '</div><div class="weui_cell_ft">'+CurentTime()+'</div></div>';
        $(".userlists").prepend(div);
    }
    function addcard(type,num)
    {
        if(type=="roundtype_4")
        {
            var sunm=Number($(".own4txt").val())+Number(num);
            $(".own4txt").val(sunm);
        }else{
             var sunm=Number($(".own8txt").val())+Number(num);
            $(".own8txt").val(sunm);
        }
    }
    function delcard(type,num)
    {
        if(type=="roundtype_4")
        {
            var sunm=Number($(".own4txt").val())-Number(num);
            $(".own4txt").val(sunm);
        }else{
             var sunm=Number($(".own8txt").val())-Number(num);
            $(".own8txt").val(sunm);
        }
    }
    function CurentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //miao
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";

        if (mm < 10) 
            clock += '0'; 
        clock += mm+ ":"; 

         if (ss < 10) 
            clock += '0'; 
        clock += ss; 
        return(clock); 
    } 

    function todayTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var clock = year + "/";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "/";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " "+"00:00:00";
        return(clock); 
    } 
    function monthTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var clock = year + "/";
       
        if(month < 10)
            clock += "0";
        clock += month + "/";
        clock += "01" + " "+"00:00:00";
        return(clock); 
    } 


    function upmonthTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        if(month==1)
        {
            year--;
            month=12;
        }else {
            month--;
        }
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month;
        return(clock); 
    } 
    function hengmonthTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
        clock += month;
        return(clock); 
    } 
