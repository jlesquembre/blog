with import <nixpkgs> {};
pkgs.mkShell {
  buildInputs = [
    nodejs-12_x
    # nodejs_latest
  ];
}
