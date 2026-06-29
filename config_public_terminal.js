// The root OS image location, change to local filepath if serving locally
export const diskImageUrl = "https://pub-942cefa95f43457eadfacb22a62f9a2e.r2.dev/bioseq-buster.ext2";
export const diskImageType = "cloud";
// Print an introduction message about the technology
export const printIntro = true;
// Is a graphical display needed
export const needsDisplay = false;
// Executable full path (Required)
export const cmd = "/bin/bash";
// Arguments, as an array (Required)
export const args = ["--login"];
// Optional extra parameters
export const opts = {
	// Environment variables
	env: ["HOME=/home/bioseq0", "TERM=xterm", "USER=bioseq0", "SHELL=/bin/bash", "EDITOR=vim", "LANG=en_US.UTF-8", "LC_ALL=C"],
	// Current working directory
	cwd: "/home/bioseq0",
	// User id
	uid: 1001,
	// Group id
	gid: 1001
};
