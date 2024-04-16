cfg.Light, cfg.Landscape, cfg.Fast, cfg.Share, cfg.MUI
app.LoadPlugin( "Utils" );
//var address = "http://www.randomfunfacts.com";
//var address = "http://www.randominsults.net/";
//var address = "http://www.randomriddles.com/";
var address = "http://www.quotability.com/";
var fonts = ["Misc/Crushed-Regular.ttf","Misc/DancingScript-VariableFont_wght.ttf","Misc/Jersey10Charted-Regular.ttf","Misc/LuckiestGuy-Regular.ttf","Misc/MontserratAlternates-ExtraLight.ttf","Misc/RubikDoodleShadow-Regular.ttf"];
//Called when application is started.
function OnStart()
{

	utils = app.CreateUtils("LuilloSoft Inc.");
	
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateText( "", 1, 1, "Multiline,VCenter" )
	txt.SetTextSize( 34, "dip")
	txt.SetTextShadow( 5, 2, 2, "#000000" );
	lay.AddChild( txt )
	
	//Add layout to app.	
	app.AddLayout( lay )
	GetFunFact();
	//var i = setInterval(()=>{GetFunFact();}, 6500);
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
        txt.SetFontFile( fonts[utils.RandomIntegerRange(0,6)] );
        txt.SetTextColor( utils.RandomHexColor(false) );
        txt.SetHtml( funfact );
        txt.Animate( "RubberBand" );
        //Speak the text at default pitch and speed.
	var pitch = 1.0, speed = 1.0;
	app.TextToSpeech( funfact, pitch, speed,GetFunFact )
    }
}