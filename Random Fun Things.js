cfg.Light, cfg.Portrait, cfg.Fast, cfg.Share, cfg.MUI
app.LoadPlugin( "Utils" );
app.LoadPlugin( "Support" );

var address = "http://www.randomfunfacts.com";
//var address = "http://www.randominsults.net/";
//var address = "http://www.randomriddles.com/";
//var address = "http://www.quotability.com/";
//address = "http://www.randomfunnyjokes.com/";
var fonts = ["Misc/Danfo-Regular-VariableFont_ELSH.ttf","Misc/Audiowide-Regular.ttf","Misc/Crushed-Regular.ttf","Misc/DancingScript-VariableFont_wght.ttf","Misc/Jersey10Charted-Regular.ttf","Misc/LuckiestGuy-Regular.ttf","Misc/MontserratAlternates-ExtraLight.ttf"];
var animations = app.CreateSupport().AnimationManager().keys;
var animLength = animations.length;
var tvar ="";
//Called when application is started.
function OnStart()
{
//alert(animLength);
	utils = app.CreateUtils("LuilloSoft Inc.");
	
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,FillXY" );
	rColor = utils.RandomHexColor(false);
	app.SetStatusBarColor(  rColor)
	app.SetNavBarColor( rColor )
CreateActionBar();
CreateMenuBar(rColor);
	//Create a text label and add it to layout.
	txt = app.CreateText( "", 1, 0.8, "Multiline,VCenter,AutoShrinhk" )
	txt.SetTextSize( 38, "dip")
	txt.SetTextShadow( 7, 2, 2, "#000000" );
	lay.AddChild( txt )
	
	//Add layout to app.	
	app.AddLayout( lay )
	GetFunFact();
	//var i = setInterval(()=>{GetFunFact();}, 6500);
}

function GetRandomAnim()
{
	gra = animations[utils.RandomIntegerRange(0, animLength)];
	app.ShowPopup( "Animation: "+gra + tvar);
	if(gra.includes("out") || gra.includes("Out") || gra.includes("Slide")) {
		return GetRandomAnim();
	} else {
		return gra;
	}
}

function GetFunFact()
{
	app.HttpRequest( "GET", address, null, null, handleReply );
}


function handleReply( error, reply )
{
rc = utils.RandomHexColor(false);
lay.SetBackGradient( utils.GetGradientColors(rc)[0],utils.GetGradientColors(rc)[1], rc);
txt.Hide();
    if( error ) alert( reply );
    else
    {
        var funfact = reply.slice( reply.indexOf("<i>") + 3, reply.indexOf("</i>") );
        //alert( funfact );
        f = fonts[utils.RandomIntegerRange(0,fonts.length)];
        //app.ShowPopup( )
        tvar = "\r\nFont selected: "+ f;
        txt.SetFontFile( f );
        txt.SetTextColor( "#ffffff");//utils.RandomHexColor(false) );
        txt.SetHtml( funfact );
        /*alert(funfact.length);
        switch (funfact.length){
        case 100:
        txt.SetTextSize( 38 );
        break;
        }*/
        txt.Animate( GetRandomAnim());
        //Speak the text at default pitch and speed.
	var pitch = 1.0, speed = 1.0;
	app.TextToSpeech( funfact, pitch, speed,GetFunFact )
    }
}

//Create an action bar at the top.
function CreateActionBar()
{
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Bottom,Horizontal,FillX,Left" );
    layHoriz.SetBackGradient( utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[0], utils.GetGradientColors(rColor)[1], utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[1]);
    //color.PINK_LIGHT_4, color.PINK_DARK_2, color.PINK_ACCENT_2);
    lay.AddChild( layHoriz );
    layHoriz.SetSize( 1, 0.07 )
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-home]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,2,12,10, "dip" );
    txtMenu.SetTextSize( 26 );
    txtMenu.SetTextColor( "white" );
txtMenu.SetTextShadow( 7, 2, 2, "#000000" );
    txtMenu.SetOnTouchUp( function(){y=0;/*FlipToBack();*//*ChangePage( home, "Home" ),txtMenu.SetText( "[fa-home]"); */} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73);//, 0.08791 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( app.GetAppName().split("_").join(" "), -1,-1, "Left" );
    txtBarTitle.SetFontFile( "Misc/LuckiestGuy-Regular.ttf");//Misc/YoungSerif-Regular.ttf" );
    txtBarTitle.SetMargins(5,0,0,10,"dip");
    txtBarTitle.SetTextSize( 22 );
    txtBarTitle.SetTextColor( "#ffffff");
    
 txtBarTitle.SetTextShadow( 7, 2, 2, "#000000" );
    layBarTitle.AddChild( txtBarTitle );
    
        
    //Create search icon.
    txtSearch = app.CreateText( "[fa-power-off]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 20,2,0,10, "dip" );
    txtSearch.SetTextSize( 26  );
    txtSearch.SetTextColor( "#ffffff");
txtSearch.SetTextShadow( 7, 2, 2, "#000000" );
    txtSearch.SetOnTouchUp( function(){/*app.OpenDrawer()*/} );
    layHoriz.AddChild( txtSearch );
    
}

function CreateMenuBar(col)
{
    layHoriz2 = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz2.SetBackGradient( utils.GetGradientColors(col)[0], col, utils.GetGradientColors(col)[1]);
    lay.AddChild( layHoriz2 );
	layHoriz2.SetSize( 1.0, 0.0991 );

mh = new Array();
mv = new Array();
mi = new Array();
mt = new Array();
mi = ["Fun Facts","Insults","Riddles","Famous Quotes"];
mi2 = ["bookmark","bookmark","bookmark","bookmark"];
for(c=0;c<4;c++){
mh[c] = app.CreateLayout( "Linear", "Vertical" );
mh[c].SetSize(0.25, 0.85);
if(c==0) mh[c].SetBackColor("#a9" + col.replace("#",""));
layHoriz2.AddChild( mh[c] );
for(d=0;d<2;d++){
mv[d] = app.CreateLayout( "Linear", "Vertical,VCenter" );
//if(d==0) { mv[d].SetSize(1.0, 0.25);}else{mv[d].SetSize(1.0, 1.75);}
//if(d==0) mv[d].SetBackColor("#ef000000");
if(d==0) mt[c] = app.CreateText( mi2[c] ), mt[c].SetMargins(0.01,0.01,0.01,0.01), mt[c].index = c, mt[c].SetOnTouch(mt_OnTouch),mt[c].SetFontFile("Misc/MaterialIcons-Regular.ttf"), mv[d].AddChild(mt[c]), mt[c].SetTextSize(24), mt[c].SetTextColor("#ffffff"), mt[c].SetTextShadow(5,2,2,"#000000");
if(d==1) mt[c] = app.CreateText( mi[c] ), mv[d].AddChild(mt[c]), mt[c].index = c, mt[c].SetOnTouch(mt_OnTouch),mt[c].SetTextColor("#ffffff"),  mt[c].SetTextShadow(5,0,0,"#000000"),mt[c].SetTextSize(12);
mh[c].AddChild(mv[d]);
}
}
}

function mt_OnTouch(event)
{
self = this;
//alert(self.GetText());
if(event.action == "Down") {
for(rt=0;rt<4;rt++){
mh[rt].SetBackColor("#00000000");
}
app.Vibrate( "0,100,30,100,50,300" );
mh[self.index].Animate(GetRandomAnim(),null, 350);
mh[self.index].SetBackColor("#a969ea69");
if(mi[self.index]=="Fun Facts" ) address = "http://www.randomfunfacts.com"
else if(mi[self.index]=="Insults" ) address = "http://www.randominsults.net/"
else if(mi[self.index]=="Riddles" ) address = "http://www.randomriddles.com/"
else if(mi[self.index]=="Famous Quotes" ) address = "http://www.quotability.com/"

//var address = "http://www.randomfunfacts.com";
//var address = "http://www.randominsults.net/";
//var address = "http://www.randomriddles.com/";
//var address = "http://www.quotability.com/";

//if(mi[self.index]=="Home" ) ChangePage( home, "Home" ),txtMenu.SetText( "[fa-home]" )
//Test below
//else if(mi[self.index]=="Images" ) ChangePage( images, "Images" ),txtMenu.SetText( "[fa-arrow-circle-o-left]" )
//else /*ChangePage( file, mi[self.index] ), txtMenu.SetText( "[fa-arrow-circle-o-left]" );*/
    
}
	//alert(JSON.stringify(event.source));
	}