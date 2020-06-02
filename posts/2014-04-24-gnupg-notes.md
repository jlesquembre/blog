---
title: GnuPG Notes
mySlug: gnupg-notes
tags:
  - gnupg
---

## Create new key

Create or edit the file `~/.gnupg/gpg.conf` and add the following lines to use
the cryptographically stronger SHA512 hashing algorithm for signatures in
preference to SHA1 algorithm.

```text
personal-digest-preferences SHA512
cert-digest-algo SHA512
default-preference-list SHA512 SHA384 SHA256 SHA224 AES256 AES192 AES CAST5 ZLIB BZIP2 ZIP Uncompressed
```

Now we can generate the keys:

```bash
gpg --gen-key
```

The system will prompt us to generate some entropy, we can just run this in
other terminal. Any expensive operation over the file system, like `find`
would we also ok.

```bash
ls -R ~
```

By default we have one master key (for signing) and one subkey (for encryption)

## List keys

We can see our public keys with this command:

```bash
gpg --list-keys
```

And our secret keys with this command:

```bash
gpg --list-secret-keys
```

To see more information about the keys, we can use this command:

```bash
gpg --edit-key KEYID_or_EMAIL
```

The output is something like this:

```
Secret key is available.
pub  4096R/AB58430D  created: 2014-04-14  expires: never       usage: SC
                     trust: ultimate      validity: ultimate
sub  4096R/D5293C21  created: 2014-04-14  expires: never       usage: E
[ultimate] (1). John Doe <jonh@gmail.com>
```

Meaning of the usage field abbreviation:

| Constant          | Character |
| ----------------- | --------- |
| PUBKEY_USAGE_SIG  | S         |
| PUBKEY_USAGE_CERT | C         |
| PUBKEY_USAGE_ENC  | E         |
| PUBKEY_USAGE_AUTH | A         |

Thus, for example, usage: SCA means that the sub-key can be used for signing,
for creating a certificate and authentication purposes.

The primary user id is indicated by a dot, and selected keys or user ids are
indicated by an asterisk

## User id management

Use the `gpg ‐‐edit-key` command to launch the `gpg>` prompt.

Select a uid:

```
gpg> uid n
```

`n` is the uid number. Use \* to select all and 0 to deselect all.

Add a uid:

```
gpg> adduid
```

Make uid primary, before you need to select a uid:

```
gpg> primary
```

## Create subkey

For extra security, it might be appropriate to physically remove the master
private key from your computer, and instead use a second generated subkey for
signing files. You can sign and encrypt files as normal with your signing
subkey and encryption subkey. If those keys ever get compromised, you can
simply revoke them and generate new ones with your uncompromised master key.

```
gpg --edit-key KEYID_or_EMAIL

gpg> addkey
.
.
.
gpg> save
```

## Export keys

```bash
gpg --armor --export KEYID_or_EMAIL > keyname.public.asc
```

`--armor` exports the key in ascii format.
Is also posible use `--export-secret-key` or `--export-secret-subkeys`

`--export` exports your whole public key. It probably doesn't make sense to
only export a public subkey (public keys are supposed to be public) and various
important bits of information are tied to the main key in any case. Your user
id, for example, is stored on the main key.

## Import subkeys

```bash
gpg --import subkey.asc
```

It is not possible to delete only the secret master key.
If you want to delete only the master secret key, you need to follow this steps:

- Export secret subkeys

- Delete secret key

```bash
gpg --delete-secret-key KEYID_or_EMAIL
```

- Import secret subkeys

You can verify it worked by running:

```
gpg --list-secret-keys
/home/john/.gnupg/secring.gpg
-----------------------------
sec#  4096R/AB58430D 2014-04-14
uid                  John Doe <jonh@gmail.com>
ssb   4096R/D5293C21 2014-04-14
```

The pound sign `#` means the signing subkey is not in the keypair located in
the keyring.

## Encrypting a file

```bash
gpg --recipient MY_KEY --recipient OTHER_KEY --encrypt message.txt
```

The encrypted message is written to `message.txt.gpg`

I wanted to make sure I could read the message too, for this reason I have two recipents.

### References

- [Series: GNU/Linux Crypto « Arabesque](https://sanctum.geek.nz/arabesque/series/gnu-linux-crypto/)
- [Creating the perfect GPG keypair](https://alexcabal.com/creating-the-perfect-gpg-keypair/)
- [How are the GPG usage flags defined in the key details listing? - Unix & Linux Stack Exchange](http://unix.stackexchange.com/questions/31996/how-are-the-gpg-usage-flags-defined-in-the-key-details-listing)
