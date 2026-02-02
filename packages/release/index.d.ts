export function release({ gitAdd, gitTag, gitPush, targetVersion, preid, isDryRun, skipBuild }?: {
    gitAdd?: boolean | undefined;
    gitTag?: boolean | undefined;
    gitPush?: boolean | undefined;
    isDryRun?: boolean | undefined;
    skipBuild?: boolean | undefined;
}): Promise<void>
