/*
	Test file included only manually or through tests profile (if exists)
	These are not systematic tests, but only for use during development 
*/

//// Example for tests
g_cond1to20 = TreeStatesConvert.Condition("range",0,20);
g_cond21to40 = TreeStatesConvert.Condition("range",21,40);
g_condAlphaA = TreeStatesConvert.Condition("regex",/^A[a-zA-Z]+$/);
g_condAlphaB = TreeStatesConvert.Condition("regex",/^B[a-zA-Z]+$/);

g_ExampleTSE1 = [
	[ "alpha", "num,null", [g_cond1to20] ],
	[ "beta", "string",[g_condAlphaA]]
];
g_ExampleTSE2 = [
	[ "alpha", "num,null", [g_cond21to40] ],
	[ "beta", "string"]
];
g_ExampleTSE21 = [
	[ "gamma", "string,null", [g_condAlphaB] ]
];

g_ExampleTSM = [
	[ [g_ExampleTSE1]
	],
	
	[ [g_ExampleTSE2],
	  [ [g_ExampleTSE21]
	  ]
	]
];